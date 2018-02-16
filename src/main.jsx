import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header.component';
import { Title } from './components/todo-title.component';
import TodoForm from './components/todo-form.component';

const Todo = ({ todo, remove, edit }) => {
    // Each Todo
    return (
        <li className="list-group-item">
            <a href="#" data-todoid={todo._id} data-toggle="tooltip" data-placement="top" title="Click on item to delete.">{todo.title} =  {todo.status}</a>
            <button onClick={() => { edit(todo._id) }}>Edit</button>
            <button onClick={() => { remove(todo._id) }}>Delete</button>
        </li>);
}

const TodoList = ({ todos, remove, edit }) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo._id} remove={remove} edit={edit} />)
    });

    return (<ul className="list-group" style={{ marginTop: '30px' }}>{todoNode}</ul>);
}

export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isEditing: false,
            editTodo: {}
        }
    }

    componentDidMount() {
        // Make HTTP reques with Axios
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

    addTodo(value) {
        // Update data
        fetch('./api/addTodo', {
            method: 'POST',
            body: JSON.stringify({ title: value, status: 'pending' }),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data);
                this.state.data.push(data);
                this.setState({ data: this.state.data });
            })
            .catch((err) => {
                console.log('Todo added to database.');
            });
    }

    editTodo(todoId) {
        const remainder = this.state.data.filter((todo) => {
            if (todo._id === todoId) return todo;
        });

        this.setState({ isEditing: true, editTodo: remainder[0] });
        console.log("remainder :", remainder);

        /* // Update data
        fetch('./api/updateTodo', {
            method: 'PUT',
            body: JSON.stringify({ id: todoId, title: value, status: 'pending' }),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data);
                //this.state.data.push(data);
                //this.setState({ data: this.state.data });
            })
            .catch((err) => {
                console.log('Todo added to database.');
            }); */
    }
    handleInputChange(newValue) {
        console.log(newValue);
}
    // Handle remove
    handleRemove(id) {
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
                console.log('removed todo item and setting state');
                this.setState({ data: remainder })
            })
            .catch((err) => {
                console.log('Todo added to database.');
            });
    }

    render() {
        return (
            <main>
                <Header />
                <div className="container">
                    <Title todoCount={this.state.data.length} />
                    <TodoForm isEditing={this.state.isEditing} handleInputChange={this.handleInputChange.bind()} editTodo={this.state.editTodo} addTodo={this.addTodo.bind(this)} />
                    <TodoList
                        todos={this.state.data}
                        remove={this.handleRemove.bind(this)}
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
