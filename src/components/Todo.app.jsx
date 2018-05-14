import React from 'react';
import { Title } from './Todo-Title.component';
import TodoForm from './Todo-Form.component';
import { TodoList } from './Todo-List.component';
import { SearchTodoItem } from './Search-Todo.component';
// 2. Todo List
// ==============================
const TodoListGroup = (props) => {
    // props = { todos, remove, edit, completeTodo }
    // Map through the todos
    let groupList;

    // If VisibleTodos length is greater then zero
    {
        groupList = Object.keys(props.visibleTodos).map(function (k) {
            return (
                <React.Fragment key={k}>
                    <p><strong>{k}</strong></p>
                    <TodoList visibleTodos={props.visibleTodos} k={k} remove={props.remove} edit={props.edit} complete={props.completeTodo} />
                </React.Fragment>
            );
        })
    }

    //return (<div>{groupList}<ul className="list-group" style={{ marginTop: '30px' }}>{todoNode}</ul></div>);
    return (<div>{groupList}</div>);
}

// 1. Main Todo App
// ==============================
export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.visibilityFilters = ["ALL_TODOS", "ACTIVE_TODOS", "COMPLETED_TODOS"];
        this.state = {
            data: {},
            initialData: {},
            isEditing: false,
            editTodo: {},
            visibilityFilter: "ALL_TODOS",
            todoCount: 0
        };
        this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    }

    componentDidMount() {
        // Render all Todo items on component render
        this.props.todoService.getAllTodos('./api/todos')
            .then((data) => {
                console.log(data);
                let newData = this.groupTodosByDate(data);
                // console.log("New Data :", newData, data);
                this.setState({ data: newData, todoCount: data.length, initialData: newData });
            })
            .catch((err) => {
                console.log('Error in fetching all reacords', err);
            });
    }

    // Add Todo item
    addTodo(value, description, id, dateCreated) {
        if (id) {
            // if Edit Mode on : Update data
            this.props.todoService.addUpdateTodo('./api/updateTodo', 'PUT', { id: id, title: value, status: 'pending', isDone: false, description: description, dateCreated: dateCreated })
                .then((data) => {
                    Object.keys(this.state.data).map((date) => {
                        this.state.data[date].find((todo, index) => {
                            if (todo._id === id) {
                                this.state.data[date].splice(index, 1, data);
                            }
                        });
                    });
                    this.setState({ data: this.state.data });
                })
                .catch((err) => {
                    console.log('Error in updating TODO to database.', err);
                });

            this.setState({ isEditing: false, editTodo: {} });
        } else {
            let formData = { title: value, status: 'pending', isDone: false, description: description, dateCreated: dateCreated };
            // Else Edit mode Off : Only Add new record
            this.props.todoService.addUpdateTodo('./api/addTodo', 'POST', formData)
                .then((data) => {
                    let date = data.today.split("T")[0].replace(/-/g, ",");
                    if (!this.state.data[date]) {
                        this.state.data[date] = [];
                    }
                    this.setState({ data: this.state.data });
                    this.state.data[date].push(data);
                    this.setState({ data: this.state.data });
                })
                .catch((err) => {
                    console.log('Error in adding TODO to database.', err);
                });
        }
    }

    // Edit Todo item
    editTodo(todoId) {
        let remainder = Object.keys(this.state.data).map((date) => {
            return this.state.data[date].filter((todo, index) => {
                if (todo._id === todoId) {
                    return todo
                }
            });
        });
        remainder.filter((value) => {
            if (value.length > 0) {
                this.setState({ isEditing: true, editTodo: value[0] });
            }
        });

    }

    // Remove Todo item
    removeTodo(id, date) {
        // Filter all todos except the one to be removed

        let filteredData = {};
        Object.keys(this.state.data).map((date) => {
            this.state.data[date].filter((todo, index) => {
                if (todo._id !== id) {
                    if (filteredData.hasOwnProperty(date)) {
                        filteredData[date].push(todo);
                    } else {
                        filteredData[date] = [todo];
                    }
                }
            });
        });

        this.props.todoService.removeTodo('./api/removeTodo', { id: id })
            .then((data) => {
                this.setState({ data: filteredData })
            })
            .catch((err) => {
                console.log('Removed Todo item successfully from database.', err);
            });
    }

    completeTodo(todoId, isDone) {
        // Mark todo ad Complete or Pending
        fetch('./api/completeTodo', {
            method: 'PUT',
            body: JSON.stringify({ id: todoId, status: isDone ? "completed" : "pending", isDone: isDone }),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => response.json())
            .then((data) => {

                Object.keys(this.state.data).map((date) => {
                    this.state.data[date].find((todo, index) => {
                        if (todo._id === todoId) {
                            this.state.data[date].splice(index, 1, data);
                        }
                    });
                });

                this.setState({ data: this.state.data });
            })
            .catch((err) => {
                console.log('Error in completing TODO to database.', err);
            });
    }

    visibleTodos() {
        //this.orderByDate(this.state.data, 'today');
        let filteredData = {};

        switch (this.state.visibilityFilter) {
            case 'ALL_TODOS':
                return this.state.data;
            case 'ACTIVE_TODOS':

                filteredData = this.filterTodos(false);
                return filteredData;

            case 'COMPLETED_TODOS':

                filteredData = this.filterTodos(true);
                return filteredData;

            default:
                return this.state.data;
        }
    }

    filterTodos(isDone) {
        let filteredData = {};

        Object.keys(this.state.data).map(date => {
            this.state.data[date].filter(todo => {
                if (todo.isDone === isDone) {
                    if (filteredData.hasOwnProperty(date)) {
                        filteredData[date].push(todo);
                    } else {
                        filteredData[date] = [todo];
                    }
                }
            })
        });

        return filteredData;
    }

    orderByDate(arr, dateProp) {
        console.log("Date :", arr, dateProp);
        return arr.slice().sort(function (a, b) {
            console.log("Date :", a[dateProp] < b[dateProp]);
            return a[dateProp] < b[dateProp] ? -1 : 1;
        });
    }

    groupTodosByDate(data) {
        var grouppedData = data.reduce((acc, el) => {
            let today = el.today.split("T")[0].replace(/-/g, ",");
            if (acc.hasOwnProperty(today)) {
                acc[today].push(el);
            } else {
                acc[today] = [el];
            }
            //console.log("555 :", acc, el)
            return acc;
        }, {});

        return grouppedData;
    }

    changeVisibilityFilter(visibilityFilter) {
        this.setState({ visibilityFilter: visibilityFilter });
    }

    handleFilterUpdate(filterValue) {
        this.setState({
            data: filterValue
        });
    }

    render() {
        let visibleTodosArray = this.visibleTodos();
        return (
            <main>
                <div className="uk-padding">

                    <SearchTodoItem data={this.state.data} initialData={this.state.initialData} updateFilter={this.handleFilterUpdate} />

                    <Title todoCount={this.state.todoCount} />
                    <TodoForm isEditing={this.state.isEditing} editTodo={this.state.editTodo} addTodo={this.addTodo.bind(this)} />
                    <h3 className="text-center">{this.state.visibilityFilter.replace('_', ' ')}</h3>

                    {
                        this.state.data &&
                        <TodoListGroup
                            todos={this.state.data}
                            visibleTodos={visibleTodosArray}
                            completeTodo={this.completeTodo.bind(this)}
                            remove={this.removeTodo.bind(this)}
                            edit={this.editTodo.bind(this)}
                        />
                    }
                    <div className="text-center p-3">
                        {
                            this.visibilityFilters.map((visibilityFilter) => {
                                return (<button
                                    className={"btn " + (this.state.visibilityFilter === visibilityFilter ? "btn-primary" : "btn-outline-primary")}
                                    key={visibilityFilter}
                                    onClick={() => this.changeVisibilityFilter(visibilityFilter)}>
                                    {visibilityFilter.replace("_", " ")}
                                </button>)
                            })
                        }
                    </div>
                </div>

            </main>
        )
    }
}
