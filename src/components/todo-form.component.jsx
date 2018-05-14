import React from 'react';

export default class TodoForm extends React.Component {
    // Input Tracker
    constructor(props) {
        super(props);
        this.state = { title: '', description: '', dueDate: new Date().toISOString().substr(0, 10) };
        this.input;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        $('#inputTxtAreaTaskDesc').summernote({
            placeholder: 'Hello stand alone ui',
            tabsize: 4,
            height: 200,
            callbacks: {
                onChange: function (contents, $editable) {

                }
            },
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

    handleChange(event) {
        console.log('Handle change :', event.target, event.target.name, event.target.value);
        this.setState({
            title: this.title.value,
            description: $(this.description).summernote('code'),
            dueDate: this.dueDate.value
        })
    }

    /* handleChange(evt) {
        // Ref : https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    } */

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
            this.setState({ title: nextProps.editTodo.title, description: nextProps.editTodo.description, date: nextProps.editTodo.dateCreated });
        }
        $(this.description).summernote('code', nextProps.editTodo.description);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Syntax : var formData = new FormData(form)
        // Ref : https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
        const form = event.target;
        const formData = new FormData(form);
        console.log('formData :: ', formData);

        let formDataObj = this.stringifyFormData(formData);

        console.log(formDataObj);

        this.setState({ title: this.title.value, description: this.senitizeInnerHtml(this.description.value), date: this.state.dueDate });

        console.log("Submit :", this.state)
        if (this.props.isEditing) {
            this.props.addTodo(this.title.value, this.senitizeInnerHtml(this.description.value), this.props.editTodo._id, this.dueDate.value);
        } else {
            this.props.addTodo(this.state.title, this.senitizeInnerHtml(this.description.value), '', this.dueDate.value);
        }

        this.setState({ title: '', description: '' });
        $(this.description).summernote('reset');
    }

    senitizeInnerHtml(htmlContent) {
        let senitizedContent = htmlContent.replace(/style="[^"]*"/g, "");

        return senitizedContent;
    }

    stringifyFormData(fd) {
        // REf : https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
        const data = {};
        for (let key of fd.keys()) {
            data[key] = fd.get(key);
        }
        return JSON.stringify(data, null, 2);
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
                <form method="post" onSubmit={this.handleSubmit}>
                    {/*<form onSubmit={(e) => {
                e.preventDefault();
                this.props.addTodo(this.input.value);
                this.input.value = '';
            }}>*/}

                    <fieldset className="uk-fieldset">
                        <legend className="uk-legend">Add Task</legend>

                        <div className="uk-margin">
                            <label htmlFor="inputTxtTaskTitle">Task Title</label>
                            <input type="text"
                                name="taskTitle"
                                className="uk-input"
                                id="inputTxtTaskTitle"
                                placeholder="Enter task title"
                                ref={(title) => this.title = title}
                                onChange={this.handleChange}
                                value={this.state.title}
                            />
                        </div>

                        <div className="uk-margin">
                            <label htmlFor="inputTxtDueDate">Task Due Date</label>
                            <input type="date"
                                name="dueDate"
                                className="uk-input"
                                id="inputTxtDueDate"
                                ref={(dueDate) => this.dueDate = dueDate}
                                onChange={this.handleChange}
                                value={this.state.dueDate}
                            />
                        </div>

                        <div className="uk-margin">
                            <label htmlFor="inputTxtAreaTaskDesc">Task Description</label>
                            <textarea className="uk-input"
                                name="editordata"
                                rows="5"
                                cols="50"
                                id="inputTxtAreaTaskDesc"
                                placeholder="Enter task description"
                                ref={(description) => this.description = description}
                                onChange={this.handleChange}
                                value={this.state.description}
                            ></textarea>
                        </div>

                        {/* <div className="form-group">
                        <input type="checkbox" onChange={this.handleChange.bind(this)} />
                    </div> */}
                        <div className="text-right">
                            <button type="submit" className="uk-button uk-button-primary">Submit</button>
                        </div>
                    </fieldset>
                </form>

            </div>
        );
    }

    render() {
        return this.renderAddTodoForm();
    }
}

// ref={(input) => this.input = input}
// ref={(node) => {this.a = node}}
