import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header.component';
import { Title } from './components/todo-title.component';
import TodoForm from './components/todo-form.component';
import TodoDataInterface from './components/TodoDataInterface';

const todoDataInterface = new TodoDataInterface();

// 3. Single Todo item
// ==============================
const SingleTodo = (props) => {
    // props = { todo, remove, edit, complete }

    let toggleTodoStatus = (event) => {
        console.log('Hi', event.target);
        if (event.target.checked) {
            props.complete(props.todo._id, event.target.checked);
        } else {
            props.complete(props.todo._id, event.target.checked);
        }

    }

    // Each Todo
    return (
        <li className={"list-group-item " + (props.todo.isDone ? "done" : "")}>
            <label htmlFor={'todoStatus_' + props.todo._id}>
                <input name="todoStatus[]" id={'todoStatus_' + props.todo._id} type="checkbox" value={props.todo._id} onChange={toggleTodoStatus.bind(this)} checked={props.todo.isDone} /> {props.todo.title} <span className={"badge " + (props.todo.isDone ? 'badge-success' : 'badge-primary')}>{props.todo.status}</span>
            </label>

            <button className="btn btn-danger float-right" onClick={() => { props.remove(props.todo._id, props.todo.today.split("T")[0].replace(/-/g, ",")) }}>Delete</button>
            <button className="btn btn-primary float-right" onClick={() => { props.edit(props.todo._id) }}>Edit</button>
            <p>{props.todo.description}</p>
            <p>Date Created :<span>{props.todo.today.split("T")[0]}</span></p>
        </li>);
}

const TodoList = (props) => {
    let todoNode;
    {
        props.visibleTodos[props.k].length > 0 ?
            (
                todoNode = props.visibleTodos[props.k].map((todo, indexOuter) => {
                    return (<SingleTodo todo={todo} key={todo._id} remove={props.remove} edit={props.edit} complete={props.complete} />)
                })
            ) : (
                todoNode = (<li className="list-group-item">Nothing here</li>)
            )
    }

    return todoNode;
}

// 2. Todo List
// ==============================
const TodoGroupList = (props) => {
    // props = { todos, remove, edit, completeTodo }
    // Map through the todos
    let groupList;

    // If VisibleTodos length is greater then zero
    {
        groupList = Object.keys(props.visibleTodos).map(function (k) {

            return (
                <div key={k}>
                    <p><strong>{k}</strong></p>
                    <TodoList visibleTodos={props.visibleTodos} k={k} remove={props.remove} edit={props.edit} complete={props.completeTodo} />
                </div>
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
            isEditing: false,
            editTodo: {},
            visibilityFilter: "ALL_TODOS"
        }
    }

    componentDidMount() {
        // Render all Todo items on component render
        this.props.dataInterface.getAllTodos('./api/todos')
            .then((data) => {
                let newData = this.groupTodosByDate(data);
                console.log("New Data :", newData, data);
                this.setState({ data: newData });
            })
            .catch((err) => {
                console.log('Error in fetching all reacords', err);
            });
    }



    // Add Todo item
    addTodo(value, description, id) {
        if (id) {
            // if Edit Mode on : Update data
            fetch('./api/updateTodo', {
                method: 'PUT',
                body: JSON.stringify({ id: id, title: value, status: 'pending', isDone: false, description: description }),
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
                            if (todo._id === id) {
                                this.state.data[date].splice(index, 1, data);
                            }
                        });
                    });

                    /* this.state.data.find((todo, index) => {
                        if (todo._id === id) {
                            this.state.data.splice(index, 1, data);
                        }
                    }); */
                    this.setState({ data: this.state.data });
                })
                .catch((err) => {
                    console.log('Error in updating TODO to database.');
                });

            this.setState({ isEditing: false, editTodo: {} });
        } else {
            // Else Edit mode Off : Only Add new record
            fetch('./api/addTodo', {
                method: 'POST',
                body: JSON.stringify({ title: value, status: 'pending', isDone: false, description: description }),
                mode: 'cors',
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'application/json'
                    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    //this.state.data.push(data);
                    //this.setState({ data: this.state.data });
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
        /* const remainder = this.state.data.filter((todo) => {
            if (todo._id === todoId) return todo;
        }); */

        let remainder = Object.keys(this.state.data).map((date) => {
            return this.state.data[date].filter((todo, index) => {
                if (todo._id === todoId) {
                    return todo
                    /* if (filteredData.hasOwnProperty(date)) {
                        filteredData[date].push(todo);
                    } else {
                        filteredData[date] = [todo];
                    } */
                }
            });
        });
        console.log('remainder :', remainder[0][0])
        this.setState({ isEditing: true, editTodo: remainder[0][0] });
    }

    // Remove Todo item
    removeTodo(id, date) {
        // Filter all todos except the one to be removed
        /* const remainder = this.state.data[date].filter((todo) => {
            if (todo._id !== id) return todo;
        }); */

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

        // Update state with filter
        fetch('./api/removeTodo', {
            method: 'DELETE',
            body: JSON.stringify({ id: id }),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => {
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
                /* this.state.data.find((todo, index) => {
                    if (todo._id === todoId) {
                        this.state.data.splice(index, 1, data);
                    }
                }); */

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
                // return this.state.data.filter(todo => todo.isDone === false);

                Object.keys(this.state.data).map((date) => {
                    this.state.data[date].filter((todo, index) => {
                        if (todo.isDone === false) {
                            if (filteredData.hasOwnProperty(date)) {
                                filteredData[date].push(todo);
                            } else {
                                filteredData[date] = [todo];
                            }
                        }
                    });
                });

                return filteredData;
            case 'COMPLETED_TODOS':

                Object.keys(this.state.data).map(date => {
                    this.state.data[date].filter(todo => {
                        if (todo.isDone === true) {
                            if (filteredData.hasOwnProperty(date)) {
                                filteredData[date].push(todo);
                            } else {
                                filteredData[date] = [todo];
                            }
                        }
                    })
                });

                return filteredData;
            //return this.state.data.filter(todo => todo.isDone === true);
            default:
                return this.state.data;
        }
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

    render() {

        let visibleTodosArray = this.visibleTodos();
        console.log('visibleTodos :', this.state.data);
        return (
            <main>
                <Header />
                <div className="container">
                    <Title todoCount={this.state.data.length} />
                    <TodoForm isEditing={this.state.isEditing} editTodo={this.state.editTodo} addTodo={this.addTodo.bind(this)} />
                    <h3 className="text-center">{this.state.visibilityFilter.replace('_', ' ')}</h3>
                    <TodoGroupList
                        todos={this.state.data}
                        visibleTodos={visibleTodosArray}
                        completeTodo={this.completeTodo.bind(this)}
                        remove={this.removeTodo.bind(this)}
                        edit={this.editTodo.bind(this)}
                    />
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

ReactDOM.render(
    <TodoApp dataInterface={todoDataInterface} />,
    document.getElementById('app')
);
