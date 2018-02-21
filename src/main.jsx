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

            <button className="btn btn-danger float-right" onClick={() => { props.remove(props.todo._id) }}>Delete</button>
            <button className="btn btn-primary float-right" onClick={() => { props.edit(props.todo._id) }}>Edit</button>
        </li>);
}


// 2. Todo List
// ==============================
const TodoList = (props) => {
    // props = { todos, remove, edit, completeTodo }
    // Map through the todos

    let todoNode;

    // If VisibleTodos length is greater then zero
    {
        props.visibleTodos.length > 0 ?
            (
                todoNode = props.visibleTodos.map((todo) => {
                    return (<SingleTodo todo={todo} key={todo._id} remove={props.remove} edit={props.edit} complete={props.completeTodo} />)
                })
            ) : (
                todoNode = (<li className="list-group-item">Nothing here</li>)
            )
    }

    return (<ul className="list-group" style={{ marginTop: '30px' }}>{todoNode}</ul>);
}


// 1. Main Todo App
// ==============================
export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.visibilityFilters = ["ALL_TODOS", "ACTIVE_TODOS", "COMPLETED_TODOS"];
        this.state = {
            data: [],
            isEditing: false,
            editTodo: {},
            visibilityFilter: "ALL_TODOS"
        }
    }

    componentDidMount() {
        // Render all Todo items on component render
        this.props.dataInterface.getAllTodos('./api/todos')
            .then((data) => {
                this.setState({ data: data })
            })
            .catch((err) => {
                console.log('Error in fetching all reacords', err);
            });

    }

    // Add Todo item
    addTodo(value, id) {
        if (id) {
            // if Edit Mode on : Update data
            fetch('./api/updateTodo', {
                method: 'PUT',
                body: JSON.stringify({ id: id, title: value, status: 'pending', isDone: false }),
                mode: 'cors',
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'application/json'
                    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    this.state.data.find((todo, index) => {
                        if (todo._id === id) {
                            this.state.data.splice(index, 1, data);
                        }
                    });
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
                body: JSON.stringify({ title: value, status: 'pending', isDone: false }),
                mode: 'cors',
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'application/json'
                    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    this.state.data.push(data);
                    this.setState({ data: this.state.data });
                })
                .catch((err) => {
                    console.log('Error in adding TODO to database.', err);
                });
        }
    }

    // Edit Todo item
    editTodo(todoId) {
        const remainder = this.state.data.filter((todo) => {
            if (todo._id === todoId) return todo;
        });

        this.setState({ isEditing: true, editTodo: remainder[0] });
    }

    // Remove Todo item
    removeTodo(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo._id !== id) return todo;
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
                this.setState({ data: remainder })
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
                this.state.data.find((todo, index) => {
                    if (todo._id === todoId) {
                        this.state.data.splice(index, 1, data);
                    }
                });
                this.setState({ data: this.state.data });
            })
            .catch((err) => {
                console.log('Error in completing TODO to database.', err);
            });
    }

    visibleTodos() {
        switch (this.state.visibilityFilter) {
            case 'ALL_TODOS':
                return this.state.data;
            case 'ACTIVE_TODOS':
                return this.state.data.filter(todo => todo.isDone === false);
            case 'COMPLETED_TODOS':
                return this.state.data.filter(todo => todo.isDone === true);
            default:
                return this.state.data;
        }
    }

    changeVisibilityFilter(visibilityFilter) {
        this.setState({ visibilityFilter: visibilityFilter });
    }

    render() {

        let visibleTodosArray = this.visibleTodos();
        console.log('visibleTodos :', visibleTodosArray);
        return (
            <main>
                <Header />
                <div className="container">
                    <Title todoCount={this.state.data.length} />
                    <TodoForm isEditing={this.state.isEditing} editTodo={this.state.editTodo} addTodo={this.addTodo.bind(this)} />
                    <h3 className="text-center">{this.state.visibilityFilter.replace('_', ' ')}</h3>
                    <TodoList
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
