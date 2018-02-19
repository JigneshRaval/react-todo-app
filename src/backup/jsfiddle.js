https://unpkg.com/react@16.2.0/umd/react.development.js
https://unpkg.com/react-dom@16.2.0/umd/react-dom.development.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Title } from './components/todo-title.component';
// import TodoForm from './components/todo-form.component';

var randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


class TodoForm extends React.Component {
    // Input Tracker
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.input;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let newTodoTitle = event.target.querySelector('input');
        this.props.addTodo(this.input.value);
        newTodoTitle.value = '';
    }

    renderAddTodoForm() {
        // Return JSX
        return (
            <form onSubmit={this.handleSubmit}>
                {/*<form onSubmit={(e) => {
                e.preventDefault();
                this.props.addTodo(this.input.value);
                this.input.value = '';
            }}>*/}
                <input className="form-control col-md-12 add-form"
                    ref={(input) => this.input = input}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)} />
                <br />
            </form>
        );
    }

    render() {
        return this.renderAddTodoForm();
    }
}

const Title = ({ todoCount }) => {
    return (
        <div>
            <div>
                <h1>to-do ({todoCount})</h1>
            </div>
        </div>
    );
}

const Todo = ({ todo, remove, edit }) => {
    // Each Todo
    return (
        <li className="list-group-item">
            <a href="#" data-todoid={todo._id} data-toggle="tooltip" data-placement="top" title="Click on item to delete.">{todo.title} =  <span class="badge badge-primary">{todo.status}</span></a>
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

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { "title": "Buy Milk", "status": "pending", "_id": "3QACIouhZZlhmm6T" },
                { "title": "Buy new computer book", "status": "pending", "_id": "9Xz2MSHIeh87WMgF" },
                { "title": "Fetch Money", "status": "pending", "_id": "DZvP2o5Dd4t9J3Ax" },
                { "title": "Play new game", "status": "pending", "_id": "Dp3J6BacTeG8ijV8" },
                { "title": "new 2", "status": "pending", "_id": "ECDUmbjOt4vtOKSv" },
                { "title": "sdfsdafsaf", "status": "pending", "_id": "GwHBilbjsbXipQuI" },
                { "title": "New 10", "status": "pending", "_id": "HGWGsNEVFNXIGZ8S" },
                { "title": "ppp", "status": "pending", "_id": "IExYBTFUFkGoHqyN" }
            ],
            isEditing: false,
            editTodo: {}
        }
    }

    componentDidMount() {
        /*
        // Make HTTP reques with vanila js fetch API
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
            */
    }

    addTodo(value) {

        this.state.data.push({ "title": value, "status": "pending", "today": { "$$date": Date.now() }, "_id": randomString(16) });
        this.setState({ data: this.state.data });

        /*
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
            });*/

    }

    editTodo(todoId) {
        const remainder = this.state.data.filter((todo) => {
            if (todo._id === todoId) return todo;
        });

        this.setState({ isEditing: true, editTodo: remainder[0] });
        console.log("remainder :", remainder[0]);

        /*
        // Update data
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
            });
            */
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
        this.setState({ data: remainder });

        /*
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
            */
    }

    render() {
        return (
            <main>
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
