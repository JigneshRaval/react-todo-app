// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Title } from './components/todo-title.component';
// import TodoForm from './components/todo-form.component';

const Title = ({ todoCount }) => {
    return (
        <div>
            <div>
                <h1>Todos: ({todoCount})</h1>
            </div>
        </div>
    );
}

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
        console.log(props.editTodo.title);
        this.state = { value: ' ' };
        this.input;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log("0 :", this.state.value);
        console.log("1 :", this.props.editTodo.title);
        console.log("2 Next Prop:", nextProps.editTodo.title);
        if (!nextProps.editTodo.title) {
            this.setState({ value: '' });
        } else if (this.props.editTodo.title === nextProps.editTodo.title) {

        } else {
            this.setState({ value: nextProps.editTodo.title });
        }
        console.log("3 :", this.state.value);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let newTodoTitle = event.target.querySelector('input');

        if (this.props.isEditing) {
            this.props.addTodo(newTodoTitle.value, this.props.editTodo._id);
        } else {
            this.props.addTodo(this.state.value, '');
        }

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


// 3. Single Todo
// ================================
const Todo = ({ todo, remove, edit }) => {
    // Each Todo
    return (
        <li className="list-group-item">
            <a href="#" data-todoid={todo._id} name="todoTitle" data-toggle="tooltip" data-placement="top" title="Click on item to delete.">{todo.title} <span className="badge badge-primary">{todo.status}</span></a>

            <button className="btn btn-danger float-right" onClick={() => { remove(todo._id) }}>Delete</button>
            <button className="btn btn-primary float-right" onClick={() => { edit(todo._id) }}>Edit</button>
        </li>);
}

// 2. Todo List
// ================================
const TodoList = ({ todos, remove, edit }) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo._id} remove={remove} edit={edit} />)
    });

    return (<ul className="list-group" style={{ marginTop: '30px' }}>{todoNode}</ul>);
}

// 1. Main TODO App
// ================================
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

    // Add Todo
    addTodo(value, id) {
        if (id) {
            this.state.data.find((todo, index) => {
                if (todo._id === id) {
                    this.state.data.splice(index, 1, { "title": value, "status": "pending", "today": { "$$date": Date.now() }, "_id": id });
                }
            });
            this.setState({ data: this.state.data });

            // Clear isEditing value to false
            this.setState({ isEditing: false, editTodo: {} });
        } else {
            this.state.data.push({ "title": value, "status": "pending", "today": { "$$date": Date.now() }, "_id": randomString(16) });
            this.setState({ data: this.state.data });
        }

    }

    // Edit Todo
    editTodo(todoId) {
        const remainder = this.state.data.find((todo) => {
            if (todo._id === todoId) return todo;
        });
        this.setState({ isEditing: true, editTodo: remainder });
    }

    // Remove Todo
    removeTodo(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo._id !== id) return todo;
        });
        this.setState({ data: remainder });
    }

    render() {
        return (
            <main>
                <div className="container">
                    <Title todoCount={this.state.data.length} />
                    <TodoForm isEditing={this.state.isEditing} editTodo={this.state.editTodo} addTodo={this.addTodo.bind(this)} />
                    <TodoList
                        todos={this.state.data}
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
