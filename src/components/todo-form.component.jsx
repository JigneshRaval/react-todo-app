import React from 'react';

export default class TodoForm extends React.Component {
    // Input Tracker
    constructor(props) {
        super(props);
        this.state = { title: '', description: '', isWeekend: false };
        this.input;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setWeekends = this.setWeekends.bind(this);
    }

    componentDidMount() {
        $('#inputTxtAreaTaskDesc').summernote({
            placeholder: 'Hello stand alone ui',
            tabsize: 4,
            height: 200,
            /* toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ] */
        });
    }

    setWeekends() {
        this.props.addTodo("Weekends", "Saturday", '');
        this.props.addTodo("Weekends", "Sunday", '');
    }

    handleChange(event) {
        this.setState({
            title: this.title.value,
            description: $(this.description).summernote('code'),
            isWeekend: !this.state.isWeekend
        })
        console.log(this.state)
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.editTodo).length === 0 && nextProps.editTodo.constructor === Object) {
            return false;
        }

        console.log("componentWillReceiveProps :", nextProps);

        if (!nextProps.editTodo.title) {
            $(this.description).summernote('reset');
            this.setState({ title: '', description: '' });

        } else if (this.props.editTodo.title === nextProps.editTodo.title) {

        } else {
            this.setState({ title: nextProps.editTodo.title, description: nextProps.editTodo.description });
        }
        $(this.description).summernote('code', nextProps.editTodo.description);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ title: this.title.value, description: this.senitizeInnerHtml(this.description.value) });
        let newTodoTitle = event.target.parentElement.querySelector('input');
        console.log('handleSubmit :', this.title.value, this.description.value, this.senitizeInnerHtml(this.description.value));
        if (this.props.isEditing) {
            //this.props.addTodo(newTodoTitle.value, this.props.editTodo._id);
            this.props.addTodo(this.title.value, this.senitizeInnerHtml(this.description.value), this.props.editTodo._id);
        } else {
            if (this.state.isWeekend) {

            } else {
                this.props.addTodo(this.state.title, this.senitizeInnerHtml(this.description.value), '');
            }
        }
        newTodoTitle.value = '';
        $(this.description).summernote('reset');
    }

    senitizeInnerHtml(htmlContent) {
        let senitizedContent = htmlContent.replace(/style="[^"]*"/g, "");

        return senitizedContent;
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        if (this.state.title === nextState.title) {
            return false;
        }
        console.log('shouldComponentUpdate :', nextProps, this.state, nextState);
    } */

    renderAddTodoForm() {
        // Return JSX
        return (
            <div>
                <form method="post">
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
                        <textarea className="form-control col-md-12" name="editordata" rows="5" cols="50"
                            id="inputTxtAreaTaskDesc"
                            placeholder="Enter task description"
                            ref={(description) => this.description = description}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.description}

                        ></textarea>
                    </div>
                    {/* <div className="form-group">
                        <input type="checkbox" onChange={this.handleChange.bind(this)} />
                    </div> */}
                    <div className="text-right">
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <button onClick={this.setWeekends} className="btn btn-primary">Weekends</button>
            </div>
        );
    }

    render() {
        return this.renderAddTodoForm();
    }
}

// ref={(input) => this.input = input}
// ref={(node) => {this.a = node}}
