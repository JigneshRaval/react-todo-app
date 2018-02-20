import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header.component';
import { Title } from './components/todo-title.component';
import TodoForm from './components/todo-form.component';

// 3. Single Todo item
// ==============================
const Todo = ({ todo, remove, edit, complete }) => {
    // Each Todo
    return (
        <li className="list-group-item">
            <label htmlFor={'todoStatus_' + todo._id}>
                <input name="todoStatus[]" id={'todoStatus_' + todo._id} type="checkbox" value={todo._id} onChange={() => complete(todo._id)} checked={todo.isDone} /> {todo.title} <span className={"badge " + (todo.isDone ? 'badge-success' : 'badge-primary')}>{todo.status}</span>
            </label>
            {/* <a href="#" data-todoid={todo._id} data-toggle="tooltip" data-placement="top" title="Click on item to delete.">{todo.title} =  <span className="badge badge-primary">{todo.status}</span></a> */}

            <button className="btn btn-danger float-right" onClick={() => { remove(todo._id) }}>Delete</button>
            <button className="btn btn-primary float-right" onClick={() => { edit(todo._id) }}>Edit</button>

        </li>);
}


// 2. Todo List
// ==============================
const TodoList = ({ todos, remove, edit, completeTodo }) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo._id} remove={remove} edit={edit} complete={completeTodo} />)
    });

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
        fetch('./api/todos')
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then((data) => {
                    this.setState({ data: data })
                });
            })
            .catch((err) => {
                console.log('Fetch Error :-S', err);
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

    completeTodo(todoId) {
        // Else Edit mode Off : Only Add new record
        fetch('./api/completeTodo', {
            method: 'PUT',
            body: JSON.stringify({ id: todoId, status: 'completed', isDone: true }),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("DaTA:", data);
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

    render() {
        return (
            <main>
                <Header />
                <div className="container">
                    <Title todoCount={this.state.data.length} />
                    <TodoForm isEditing={this.state.isEditing} editTodo={this.state.editTodo} addTodo={this.addTodo.bind(this)} />
                    <TodoList
                        todos={this.state.data}
                        completeTodo={this.completeTodo.bind(this)}
                        remove={this.removeTodo.bind(this)}
                        edit={this.editTodo.bind(this)}
                    />
                </div>
            </main>
        )
    }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById('app')
);
