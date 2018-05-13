import React from 'react';

export default class TodoForm extends React.Component {
    // Input Tracker
    constructor(props) {
        super(props);
        this.state = { title: '', description: '', isWeekend: false, dueDate: new Date().toISOString().substr(0, 10) };
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
            isWeekend: !this.state.isWeekend,
            dueDate: this.dueDate.value
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
            if (this.state.isWeekend) {

            } else {
                this.props.addTodo(this.state.title, this.senitizeInnerHtml(this.description.value), '', this.dueDate.value);
            }
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
                        <label htmlFor="inputTxtDueDate">Task Due Date</label>
                        <input type="date"
                            className="form-control col-md-12"
                            id="inputTxtDueDate"
                            ref={(dueDate) => this.dueDate = dueDate}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.dueDate}
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
                        <button type="submit" className="btn btn-primary">Submit</button>
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
