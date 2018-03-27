import React from 'react';

export default class TodoForm extends React.Component {
    // Input Tracker
    constructor(props) {
        super(props);
        this.state = { title: '', description: '' };
        this.input;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            title: this.title.value,
            description: this.description.value
        })

        console.log(this.state)
    }

    componentWillReceiveProps(nextProps) {
        console.log("111 :", nextProps)
        if (!nextProps.editTodo.title) {
            this.setState({ title: '', description: '' });
        } else if (this.props.editTodo.title === nextProps.editTodo.title) {

        } else {
            this.setState({ title: nextProps.editTodo.title, description: nextProps.editTodo.description });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ title: this.title.value, description: this.description.value });
        let newTodoTitle = event.target.parentElement.querySelector('input');
        console.log(this.title.value, this.description.value);
        if (this.props.isEditing) {
            //this.props.addTodo(newTodoTitle.value, this.props.editTodo._id);
            this.props.addTodo(this.title.value, this.description.value, this.props.editTodo._id);
        } else {
            this.props.addTodo(this.state.title, this.description.value, '');
        }
        newTodoTitle.value = '';
    }

    renderAddTodoForm() {
        // Return JSX
        return (
            <form>
                {/*<form onSubmit={(e) => {
                e.preventDefault();
                this.props.addTodo(this.input.value);
                this.input.value = '';
            }}>*/}

                <div className="form-group">
                    <label htmlFor="inputTxtTaskTitle">Task Title</label>
                    <input className="form-control col-md-12 add-form"
                        id="inputTxtTaskTitle"
                        placeholder="Enter task title"
                        ref={(title) => this.title = title}
                        onChange={this.handleChange.bind(this)}
                        value={this.state.title}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="inputTxtAreaTaskDesc">Task Description</label>
                    <textarea className="form-control col-md-12" rows="5" cols="50"
                        id="inputTxtAreaTaskDesc"
                        placeholder="Enter task description"
                        ref={(description) => this.description = description}
                        onChange={this.handleChange.bind(this)}
                        value={this.state.description}

                    ></textarea>
                </div>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        );
    }

    render() {
        return this.renderAddTodoForm();
    }
}

// ref={(input) => this.input = input}
// ref={(node) => {this.a = node}}
