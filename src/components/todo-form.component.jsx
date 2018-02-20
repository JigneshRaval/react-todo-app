import React from 'react';

export default class TodoForm extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        if (!nextProps.editTodo.title) {
            this.setState({ value: '' });
        } else if (this.props.editTodo.title === nextProps.editTodo.title) {

        } else {
            this.setState({ value: nextProps.editTodo.title });
        }
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

// ref={(input) => this.input = input}
// ref={(node) => {this.a = node}}
