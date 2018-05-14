(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp([0],{

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Header = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = exports.Header = function Header() {
    return _react2.default.createElement(
        'nav',
        { className: 'uk-navbar-container', 'uk-navbar': '' },
        _react2.default.createElement(
            'div',
            { className: 'uk-navbar-item' },
            _react2.default.createElement(
                'a',
                { 'class': 'uk-navbar-toggle', href: '#offcanvas-overlay', 'uk-toggle': '' },
                _react2.default.createElement('span', { 'uk-navbar-toggle-icon': '' }),
                ' ',
                _react2.default.createElement(
                    'span',
                    { 'class': 'uk-margin-small-left' },
                    'Menu'
                )
            )
        ),
        _react2.default.createElement(
            'h5',
            { className: 'uk-navbar-item app-title' },
            'TODO Application'
        ),
        _react2.default.createElement(
            'div',
            { className: 'uk-navbar-left' },
            _react2.default.createElement(
                'ul',
                { className: 'uk-navbar-nav' },
                _react2.default.createElement(
                    'li',
                    { className: 'uk-active' },
                    _react2.default.createElement(
                        'a',
                        { href: '#' },
                        'Active'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: '#' },
                        'Parent'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uk-navbar-dropdown' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'uk-nav uk-navbar-dropdown-nav' },
                            _react2.default.createElement(
                                'li',
                                { className: 'uk-active' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '#' },
                                    'Active'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '#' },
                                    'Item'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '#' },
                                    'Item'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        'a',
                        { className: 'btn btn-outline-primary', href: '#' },
                        'Login'
                    )
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'uk-navbar-right' },
            _react2.default.createElement(HeaderNavigation, null)
        )
    );
};

var HeaderNavigation = function HeaderNavigation() {
    //render() {
    return _react2.default.createElement(
        'ul',
        { className: 'uk-navbar-nav' },
        _react2.default.createElement(
            'li',
            { className: 'uk-active' },
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/' },
                'Home'
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/about' },
                'About Us'
            ),
            _react2.default.createElement(
                'div',
                { className: 'uk-navbar-dropdown' },
                _react2.default.createElement(
                    'ul',
                    { className: 'uk-nav uk-navbar-dropdown-nav' },
                    _react2.default.createElement(
                        'li',
                        { className: 'uk-active' },
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'Active'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'Item'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'Item'
                        )
                    )
                )
            )
        ),
        _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/topics' },
                'Topics'
            )
        )
    );
    //};
};

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(26);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _Home = __webpack_require__(94);

var _Home2 = __webpack_require__(95);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Allow passing props to <Route> to be passed down to the component it renders
https://github.com/ReactTraining/react-router/issues/5521
https://tylermcginnis.com/react-router-pass-props-to-components/
The simplest solution is just to use render instead:

<Route path="/abc" render={()=><TestWidget num="2" someProp={100}/>}/>
*/
_reactDom2.default.render(_react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.HomeView }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/about', component: _Home.About }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/topics', component: _Home.Topics })
    )
), document.getElementById('app'));
//import { BrowserRouter } from 'react-router-dom'

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Title = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Title = exports.Title = function Title(_ref) {
    var todoCount = _ref.todoCount;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h1',
                null,
                'Todo : ',
                todoCount
            )
        )
    );
};

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoForm = function (_React$Component) {
    _inherits(TodoForm, _React$Component);

    // Input Tracker
    function TodoForm(props) {
        _classCallCheck(this, TodoForm);

        var _this = _possibleConstructorReturn(this, (TodoForm.__proto__ || Object.getPrototypeOf(TodoForm)).call(this, props));

        _this.state = { title: '', description: '', dueDate: new Date().toISOString().substr(0, 10) };
        _this.input;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(TodoForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('#inputTxtAreaTaskDesc').summernote({
                placeholder: 'Hello stand alone ui',
                tabsize: 4,
                height: 200,
                callbacks: {
                    onChange: function onChange(contents, $editable) {}
                }
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
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            console.log('Handle change :', event.target, event.target.name, event.target.value);
            this.setState({
                title: this.title.value,
                description: $(this.description).summernote('code'),
                dueDate: this.dueDate.value
            });
        }

        /* handleChange(evt) {
            // Ref : https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
            // check it out: we get the evt.target.name (which will be either "email" or "password")
            // and use it to target the key on our `state` object with the same name, using bracket syntax
            this.setState({ [evt.target.name]: evt.target.value });
        } */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (Object.keys(nextProps.editTodo).length === 0 && nextProps.editTodo.constructor === Object) {
                return false;
            }

            console.log("componentWillReceiveProps :", nextProps);

            if (!nextProps.editTodo.title) {
                $(this.description).summernote('reset');
                this.setState({ title: '', description: '' });
            } else if (this.props.editTodo.title === nextProps.editTodo.title) {} else {
                this.setState({ title: nextProps.editTodo.title, description: nextProps.editTodo.description, date: nextProps.editTodo.dateCreated });
            }
            $(this.description).summernote('code', nextProps.editTodo.description);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            // Syntax : var formData = new FormData(form)
            // Ref : https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
            var form = event.target;
            var formData = new FormData(form);
            console.log('formData :: ', formData);

            var formDataObj = this.stringifyFormData(formData);

            console.log(formDataObj);

            this.setState({ title: this.title.value, description: this.senitizeInnerHtml(this.description.value), date: this.state.dueDate });

            console.log("Submit :", this.state);
            if (this.props.isEditing) {
                this.props.addTodo(this.title.value, this.senitizeInnerHtml(this.description.value), this.props.editTodo._id, this.dueDate.value);
            } else {
                this.props.addTodo(this.state.title, this.senitizeInnerHtml(this.description.value), '', this.dueDate.value);
            }

            this.setState({ title: '', description: '' });
            $(this.description).summernote('reset');
        }
    }, {
        key: 'senitizeInnerHtml',
        value: function senitizeInnerHtml(htmlContent) {
            var senitizedContent = htmlContent.replace(/style="[^"]*"/g, "");

            return senitizedContent;
        }
    }, {
        key: 'stringifyFormData',
        value: function stringifyFormData(fd) {
            // REf : https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
            var data = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = fd.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    data[key] = fd.get(key);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return JSON.stringify(data, null, 2);
        }

        /* shouldComponentUpdate(nextProps, nextState) {
            if (this.state.title === nextState.title) {
                return false;
            }
            console.log('shouldComponentUpdate :', nextProps, this.state, nextState);
        } */

    }, {
        key: 'renderAddTodoForm',
        value: function renderAddTodoForm() {
            var _this2 = this;

            // Return JSX
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { method: 'post', onSubmit: this.handleSubmit },
                    _react2.default.createElement(
                        'fieldset',
                        { className: 'uk-fieldset' },
                        _react2.default.createElement(
                            'legend',
                            { className: 'uk-legend' },
                            'Add Task'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-margin' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'inputTxtTaskTitle' },
                                'Task Title'
                            ),
                            _react2.default.createElement('input', { type: 'text',
                                name: 'taskTitle',
                                className: 'uk-input',
                                id: 'inputTxtTaskTitle',
                                placeholder: 'Enter task title',
                                ref: function ref(title) {
                                    return _this2.title = title;
                                },
                                onChange: this.handleChange,
                                value: this.state.title
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-margin' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'inputTxtDueDate' },
                                'Task Due Date'
                            ),
                            _react2.default.createElement('input', { type: 'date',
                                name: 'dueDate',
                                className: 'uk-input',
                                id: 'inputTxtDueDate',
                                ref: function ref(dueDate) {
                                    return _this2.dueDate = dueDate;
                                },
                                onChange: this.handleChange,
                                value: this.state.dueDate
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uk-margin' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'inputTxtAreaTaskDesc' },
                                'Task Description'
                            ),
                            _react2.default.createElement('textarea', { className: 'uk-input',
                                name: 'editordata',
                                rows: '5',
                                cols: '50',
                                id: 'inputTxtAreaTaskDesc',
                                placeholder: 'Enter task description',
                                ref: function ref(description) {
                                    return _this2.description = description;
                                },
                                onChange: this.handleChange,
                                value: this.state.description
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text-right' },
                            _react2.default.createElement(
                                'button',
                                { type: 'submit', className: 'uk-button uk-button-primary' },
                                'Submit'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderAddTodoForm();
        }
    }]);

    return TodoForm;
}(_react2.default.Component);

// ref={(input) => this.input = input}
// ref={(node) => {this.a = node}}


exports.default = TodoForm;

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoService = function () {
    function TodoService() {
        _classCallCheck(this, TodoService);

        this.todos = [];
    }

    _createClass(TodoService, [{
        key: 'getAllTodos',
        value: function getAllTodos(url) {
            var _this = this;

            // Render all Todo items on component render
            return fetch(url).then(function (response) {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                _this.todos = response.json();
                return _this.todos;
            });
        }
    }, {
        key: 'addUpdateTodo',
        value: function addUpdateTodo(url, method, dataObject) {
            var _this2 = this;

            return fetch(url, {
                method: method,
                body: JSON.stringify(dataObject),
                mode: 'cors',
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'application/json'
                    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            }).then(function (response) {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                _this2.todos = response.json();
                return _this2.todos;
                // response.json()
            });
        }
    }, {
        key: 'removeTodo',
        value: function removeTodo(url, dataObject) {
            var _this3 = this;

            // Update state with filter
            return fetch(url, {
                method: 'DELETE',
                body: JSON.stringify(dataObject),
                mode: 'cors',
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'application/json'
                    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                })
            }).then(function (response) {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                _this3.todos = response.json();
                return _this3.todos;
            }).catch(function (err) {
                console.log('Removed Todo item successfully from database.', err);
            });
        }
    }]);

    return TodoService;
}();

exports.default = TodoService;

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TodoList = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 3. Single Todo item
// ==============================
var SingleTodo = function SingleTodo(props) {
    // props = { todo, remove, edit, complete }

    var toggleTodoStatus = function toggleTodoStatus(event) {
        console.log('Hi', event.target);
        if (event.target.checked) {
            props.complete(props.todo._id, event.target.checked);
        } else {
            props.complete(props.todo._id, event.target.checked);
        }
    };

    function createMarkup(htmlContent) {
        return { __html: htmlContent };
    }

    // Each Todo
    return _react2.default.createElement(
        'li',
        { className: "list-group-item " + (props.todo.isDone ? "done" : "") },
        _react2.default.createElement(
            'a',
            { className: 'uk-accordion-title uk-box-shadow-hover-small uk-padding', href: '#' },
            _react2.default.createElement(
                'label',
                { htmlFor: 'todoStatus_' + props.todo._id },
                _react2.default.createElement('input', { name: 'todoStatus[]', id: 'todoStatus_' + props.todo._id, type: 'checkbox', value: props.todo._id, onChange: toggleTodoStatus, checked: props.todo.isDone }),
                ' ',
                props.todo.title,
                ' ',
                _react2.default.createElement(
                    'span',
                    { className: "uk-label " + (props.todo.isDone ? 'uk-label-success' : '') },
                    props.todo.status
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'uk-accordion-content' },
            _react2.default.createElement('div', { dangerouslySetInnerHTML: createMarkup(props.todo.description) }),
            _react2.default.createElement(
                'p',
                null,
                'Task Due Date :',
                _react2.default.createElement(
                    'span',
                    null,
                    props.todo.dateCreated
                )
            ),
            _react2.default.createElement(
                'p',
                null,
                'Task Created :',
                _react2.default.createElement(
                    'span',
                    null,
                    props.todo.today.split("T")[0].replace(/-/g, "-")
                )
            ),
            _react2.default.createElement(
                'p',
                null,
                'Last Modified Date :',
                _react2.default.createElement(
                    'span',
                    null,
                    props.todo.dateUpdated
                )
            ),
            _react2.default.createElement(
                'button',
                { className: 'uk-button uk-button-primary', onClick: function onClick() {
                        props.edit(props.todo._id);
                    } },
                'Edit'
            ),
            _react2.default.createElement(
                'button',
                { className: 'uk-button uk-button-danger', onClick: function onClick() {
                        props.remove(props.todo._id, props.todo.today.split("T")[0].replace(/-/g, ","));
                    } },
                'Delete'
            )
        )
    );
};

var TodoList = exports.TodoList = function TodoList(props) {
    var todoNode = void 0;
    {
        props.visibleTodos[props.k].length > 0 ? todoNode = props.visibleTodos[props.k].map(function (todo, indexOuter) {
            return _react2.default.createElement(SingleTodo, { todo: todo, key: todo._id, remove: props.remove, edit: props.edit, complete: props.complete });
        }) : todoNode = _react2.default.createElement(
            'li',
            { className: 'list-group-item' },
            'Nothing here'
        );
    }

    return _react2.default.createElement(
        'ul',
        { 'uk-accordion': 'collapsible: true' },
        todoNode
    );
};

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Topic = exports.Topics = exports.About = exports.Home = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

var _Header = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = exports.Home = function Home() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Header.Header, null),
        _react2.default.createElement(
            'h2',
            null,
            'Home'
        )
    );
};

var About = exports.About = function About() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Header.Header, null),
        _react2.default.createElement(
            'h2',
            null,
            'About'
        )
    );
};

var Topics = exports.Topics = function Topics(_ref) {
    var match = _ref.match;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Header.Header, null),
        _react2.default.createElement(
            'h2',
            null,
            'Topics'
        ),
        _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: match.url + '/rendering' },
                    'Rendering with React'
                )
            ),
            _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: match.url + '/components' },
                    'Components'
                )
            ),
            _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: match.url + '/props-v-state' },
                    'Props v. State'
                )
            )
        ),
        _react2.default.createElement(_reactRouterDom.Route, { path: match.url + '/:topicId', component: Topic }),
        _react2.default.createElement(_reactRouterDom.Route, {
            exact: true,
            path: match.url,
            render: function render() {
                return _react2.default.createElement(
                    'h3',
                    null,
                    'Please select a topic.'
                );
            }
        })
    );
};

var Topic = exports.Topic = function Topic(_ref2) {
    var match = _ref2.match;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'h3',
            null,
            match.params.topicId
        )
    );
};

//export { Home, About, Topics, Topic }

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HomeView = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Header = __webpack_require__(40);

var _Todo = __webpack_require__(96);

var _Todo2 = __webpack_require__(87);

var _Todo3 = _interopRequireDefault(_Todo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoService = new _Todo3.default();

var HomeView = exports.HomeView = function HomeView() {

    return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
            'div',
            { id: 'offcanvas-overlay', 'uk-offcanvas': 'overlay: false' },
            _react2.default.createElement(
                'div',
                { className: 'uk-offcanvas-bar' },
                _react2.default.createElement('button', { className: 'uk-offcanvas-close', type: 'button', 'uk-close': '' }),
                _react2.default.createElement(
                    'h3',
                    null,
                    'Title'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                )
            )
        ),
        _react2.default.createElement(_Header.Header, null),
        _react2.default.createElement(
            'div',
            { 'uk-grid': '' },
            _react2.default.createElement(
                'div',
                { className: 'uk-width-1-4@m' },
                _react2.default.createElement(
                    'nav',
                    { className: 'sidebar-nav' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '' },
                                'Completed'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'uk-width-expand@m' },
                _react2.default.createElement(_Todo.TodoApp, { todoService: todoService })
            )
        )
    );
};

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TodoApp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TodoTitle = __webpack_require__(85);

var _TodoForm = __webpack_require__(86);

var _TodoForm2 = _interopRequireDefault(_TodoForm);

var _TodoList = __webpack_require__(88);

var _SearchTodo = __webpack_require__(97);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 2. Todo List
// ==============================
var TodoListGroup = function TodoListGroup(props) {
    // props = { todos, remove, edit, completeTodo }
    // Map through the todos
    var groupList = void 0;

    // If VisibleTodos length is greater then zero
    {
        groupList = Object.keys(props.visibleTodos).map(function (k) {
            return _react2.default.createElement(
                _react2.default.Fragment,
                { key: k },
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'strong',
                        null,
                        k
                    )
                ),
                _react2.default.createElement(_TodoList.TodoList, { visibleTodos: props.visibleTodos, k: k, remove: props.remove, edit: props.edit, complete: props.completeTodo })
            );
        });
    }

    //return (<div>{groupList}<ul className="list-group" style={{ marginTop: '30px' }}>{todoNode}</ul></div>);
    return _react2.default.createElement(
        'div',
        null,
        groupList
    );
};

// 1. Main Todo App
// ==============================

var TodoApp = exports.TodoApp = function (_React$Component) {
    _inherits(TodoApp, _React$Component);

    function TodoApp(props) {
        _classCallCheck(this, TodoApp);

        var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

        _this.visibilityFilters = ["ALL_TODOS", "ACTIVE_TODOS", "COMPLETED_TODOS"];
        _this.state = {
            data: {},
            initialData: {},
            isEditing: false,
            editTodo: {},
            visibilityFilter: "ALL_TODOS",
            todoCount: 0
        };
        _this.handleFilterUpdate = _this.handleFilterUpdate.bind(_this);
        return _this;
    }

    _createClass(TodoApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // Render all Todo items on component render
            this.props.todoService.getAllTodos('./api/todos').then(function (data) {
                console.log(data);
                var newData = _this2.groupTodosByDate(data);
                // console.log("New Data :", newData, data);
                _this2.setState({ data: newData, todoCount: data.length, initialData: newData });
            }).catch(function (err) {
                console.log('Error in fetching all reacords', err);
            });
        }

        // Add Todo item

    }, {
        key: 'addTodo',
        value: function addTodo(value, description, id, dateCreated) {
            var _this3 = this;

            if (id) {
                // if Edit Mode on : Update data
                this.props.todoService.addUpdateTodo('./api/updateTodo', 'PUT', { id: id, title: value, status: 'pending', isDone: false, description: description, dateCreated: dateCreated }).then(function (data) {
                    Object.keys(_this3.state.data).map(function (date) {
                        _this3.state.data[date].find(function (todo, index) {
                            if (todo._id === id) {
                                _this3.state.data[date].splice(index, 1, data);
                            }
                        });
                    });
                    _this3.setState({ data: _this3.state.data });
                }).catch(function (err) {
                    console.log('Error in updating TODO to database.', err);
                });

                this.setState({ isEditing: false, editTodo: {} });
            } else {
                var formData = { title: value, status: 'pending', isDone: false, description: description, dateCreated: dateCreated };
                // Else Edit mode Off : Only Add new record
                this.props.todoService.addUpdateTodo('./api/addTodo', 'POST', formData).then(function (data) {
                    var date = data.today.split("T")[0].replace(/-/g, ",");
                    if (!_this3.state.data[date]) {
                        _this3.state.data[date] = [];
                    }
                    _this3.setState({ data: _this3.state.data });
                    _this3.state.data[date].push(data);
                    _this3.setState({ data: _this3.state.data });
                }).catch(function (err) {
                    console.log('Error in adding TODO to database.', err);
                });
            }
        }

        // Edit Todo item

    }, {
        key: 'editTodo',
        value: function editTodo(todoId) {
            var _this4 = this;

            var remainder = Object.keys(this.state.data).map(function (date) {
                return _this4.state.data[date].filter(function (todo, index) {
                    if (todo._id === todoId) {
                        return todo;
                    }
                });
            });
            remainder.filter(function (value) {
                if (value.length > 0) {
                    _this4.setState({ isEditing: true, editTodo: value[0] });
                }
            });
        }

        // Remove Todo item

    }, {
        key: 'removeTodo',
        value: function removeTodo(id, date) {
            var _this5 = this;

            // Filter all todos except the one to be removed

            var filteredData = {};
            Object.keys(this.state.data).map(function (date) {
                _this5.state.data[date].filter(function (todo, index) {
                    if (todo._id !== id) {
                        if (filteredData.hasOwnProperty(date)) {
                            filteredData[date].push(todo);
                        } else {
                            filteredData[date] = [todo];
                        }
                    }
                });
            });

            this.props.todoService.removeTodo('./api/removeTodo', { id: id }).then(function (data) {
                _this5.setState({ data: filteredData });
            }).catch(function (err) {
                console.log('Removed Todo item successfully from database.', err);
            });
        }
    }, {
        key: 'completeTodo',
        value: function completeTodo(todoId, isDone) {
            var _this6 = this;

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
            }).then(function (response) {
                return response.json();
            }).then(function (data) {

                Object.keys(_this6.state.data).map(function (date) {
                    _this6.state.data[date].find(function (todo, index) {
                        if (todo._id === todoId) {
                            _this6.state.data[date].splice(index, 1, data);
                        }
                    });
                });

                _this6.setState({ data: _this6.state.data });
            }).catch(function (err) {
                console.log('Error in completing TODO to database.', err);
            });
        }
    }, {
        key: 'visibleTodos',
        value: function visibleTodos() {
            //this.orderByDate(this.state.data, 'today');
            var filteredData = {};

            switch (this.state.visibilityFilter) {
                case 'ALL_TODOS':
                    return this.state.data;
                case 'ACTIVE_TODOS':

                    filteredData = this.filterTodos(false);
                    return filteredData;

                case 'COMPLETED_TODOS':

                    filteredData = this.filterTodos(true);
                    return filteredData;

                default:
                    return this.state.data;
            }
        }
    }, {
        key: 'filterTodos',
        value: function filterTodos(isDone) {
            var _this7 = this;

            var filteredData = {};

            Object.keys(this.state.data).map(function (date) {
                _this7.state.data[date].filter(function (todo) {
                    if (todo.isDone === isDone) {
                        if (filteredData.hasOwnProperty(date)) {
                            filteredData[date].push(todo);
                        } else {
                            filteredData[date] = [todo];
                        }
                    }
                });
            });

            return filteredData;
        }
    }, {
        key: 'orderByDate',
        value: function orderByDate(arr, dateProp) {
            console.log("Date :", arr, dateProp);
            return arr.slice().sort(function (a, b) {
                console.log("Date :", a[dateProp] < b[dateProp]);
                return a[dateProp] < b[dateProp] ? -1 : 1;
            });
        }
    }, {
        key: 'groupTodosByDate',
        value: function groupTodosByDate(data) {
            var grouppedData = data.reduce(function (acc, el) {
                var today = el.today.split("T")[0].replace(/-/g, ",");
                if (acc.hasOwnProperty(today)) {
                    acc[today].push(el);
                } else {
                    acc[today] = [el];
                }
                //console.log("555 :", acc, el)
                return acc;
            }, {});

            return grouppedData;
        }
    }, {
        key: 'changeVisibilityFilter',
        value: function changeVisibilityFilter(visibilityFilter) {
            this.setState({ visibilityFilter: visibilityFilter });
        }
    }, {
        key: 'handleFilterUpdate',
        value: function handleFilterUpdate(filterValue) {
            this.setState({
                data: filterValue
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var visibleTodosArray = this.visibleTodos();
            return _react2.default.createElement(
                'main',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(_SearchTodo.SearchTodoItem, { data: this.state.data, initialData: this.state.initialData, updateFilter: this.handleFilterUpdate }),
                    _react2.default.createElement(_TodoTitle.Title, { todoCount: this.state.todoCount }),
                    _react2.default.createElement(_TodoForm2.default, { isEditing: this.state.isEditing, editTodo: this.state.editTodo, addTodo: this.addTodo.bind(this) }),
                    _react2.default.createElement(
                        'h3',
                        { className: 'text-center' },
                        this.state.visibilityFilter.replace('_', ' ')
                    ),
                    this.state.data && _react2.default.createElement(TodoListGroup, {
                        todos: this.state.data,
                        visibleTodos: visibleTodosArray,
                        completeTodo: this.completeTodo.bind(this),
                        remove: this.removeTodo.bind(this),
                        edit: this.editTodo.bind(this)
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-center p-3' },
                        this.visibilityFilters.map(function (visibilityFilter) {
                            return _react2.default.createElement(
                                'button',
                                {
                                    className: "btn " + (_this8.state.visibilityFilter === visibilityFilter ? "btn-primary" : "btn-outline-primary"),
                                    key: visibilityFilter,
                                    onClick: function onClick() {
                                        return _this8.changeVisibilityFilter(visibilityFilter);
                                    } },
                                visibilityFilter.replace("_", " ")
                            );
                        })
                    )
                )
            );
        }
    }]);

    return TodoApp;
}(_react2.default.Component);

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchTodoItem = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchTodoItem = exports.SearchTodoItem = function SearchTodoItem(props) {
    var filterList = function filterList(event) {

        var filteredData = {};

        Object.keys(props.initialData).map(function (date) {
            props.initialData[date].filter(function (todo) {
                if (todo.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
                    if (filteredData.hasOwnProperty(date)) {
                        filteredData[date].push(todo);
                    } else {
                        filteredData[date] = [todo];
                    }
                }
            });
        });

        props.updateFilter(filteredData);
        //return filteredData;
    };

    return _react2.default.createElement("input", { type: "text", className: "uk-input", placeholder: "Search", onChange: filterList });
};

// <SearchTodoItem data={this.state.data} initialData={this.state.initialData} />

/***/ })

},[41]);
});
//# sourceMappingURL=app.js.map