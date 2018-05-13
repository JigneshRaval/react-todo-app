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
        'div',
        { className: 'd-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow' },
        _react2.default.createElement(
            'h5',
            { className: 'my-0 mr-md-auto font-weight-normal' },
            'TODO Application'
        ),
        _react2.default.createElement(HeaderNavigation, null),
        _react2.default.createElement(
            'a',
            { className: 'btn btn-outline-primary', href: '#' },
            'Login'
        )
    );
};

var HeaderNavigation = function HeaderNavigation() {
    //render() {
    return _react2.default.createElement(
        'nav',
        { className: 'my-2 my-md-0 mr-md-3' },
        _react2.default.createElement(
            _reactRouterDom.Link,
            { className: 'p-2 text-dark', to: '/' },
            'Home'
        ),
        _react2.default.createElement(
            _reactRouterDom.Link,
            { className: 'p-2 text-dark', to: '/about' },
            'About Us'
        ),
        _react2.default.createElement(
            _reactRouterDom.Link,
            { className: 'p-2 text-dark', to: '/topics' },
            'Topics'
        )
    );
    //};
};

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TodoApp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(26);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(12);

var _Home = __webpack_require__(84);

var _Header = __webpack_require__(40);

var _TodoTitle = __webpack_require__(85);

var _TodoForm = __webpack_require__(86);

var _TodoForm2 = _interopRequireDefault(_TodoForm);

var _Todo = __webpack_require__(87);

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoList = __webpack_require__(88);

var _Context = __webpack_require__(89);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { BrowserRouter } from 'react-router-dom'


// Examples


var todoService = new _Todo2.default();

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
                /* this.state.data.find((todo, index) => {
                    if (todo._id === todoId) {
                        this.state.data.splice(index, 1, data);
                    }
                }); */

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
                    // return this.state.data.filter(todo => todo.isDone === false);
                    filteredData = this.filterTodos(false);
                    /* Object.keys(this.state.data).map((date) => {
                        this.state.data[date].filter((todo, index) => {
                            if (todo.isDone === false) {
                                if (filteredData.hasOwnProperty(date)) {
                                    filteredData[date].push(todo);
                                } else {
                                    filteredData[date] = [todo];
                                }
                            }
                        });
                    });*/

                    return filteredData;
                case 'COMPLETED_TODOS':

                    filteredData = this.filterTodos(true);
                    /* Object.keys(this.state.data).map(date => {
                        this.state.data[date].filter(todo => {
                            if (todo.isDone === true) {
                                if (filteredData.hasOwnProperty(date)) {
                                    filteredData[date].push(todo);
                                } else {
                                    filteredData[date] = [todo];
                                }
                            }
                        })
                    }); */

                    return filteredData;
                //return this.state.data.filter(todo => todo.isDone === true);
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
        key: 'filterList',
        value: function filterList(event) {
            var _this8 = this;

            var filteredData = {};

            Object.keys(this.state.initialData).map(function (date) {
                _this8.state.initialData[date].filter(function (todo) {
                    if (todo.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
                        if (filteredData.hasOwnProperty(date)) {
                            filteredData[date].push(todo);
                        } else {
                            filteredData[date] = [todo];
                        }
                    }
                });
            });

            this.setState({ data: filteredData });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var visibleTodosArray = this.visibleTodos();
            // console.log('visibleTodos :', this.state.data);
            return _react2.default.createElement(
                'main',
                null,
                _react2.default.createElement(_Header.Header, null),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement('input', { type: 'text', className: 'form-control col-md-12 add-form', placeholder: 'Search', onChange: this.filterList.bind(this) }),
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
                                    className: "btn " + (_this9.state.visibilityFilter === visibilityFilter ? "btn-primary" : "btn-outline-primary"),
                                    key: visibilityFilter,
                                    onClick: function onClick() {
                                        return _this9.changeVisibilityFilter(visibilityFilter);
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
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', render: function render() {
                return _react2.default.createElement(TodoApp, { todoService: todoService });
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/about', component: _Home.About }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/topics', component: _Home.Topics })
    )
), document.getElementById('app'));

/***/ }),

/***/ 84:
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

        _this.state = { title: '', description: '', isWeekend: false, dueDate: new Date().toISOString().substr(0, 10) };
        _this.input;
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.setWeekends = _this.setWeekends.bind(_this);
        return _this;
    }

    _createClass(TodoForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('#inputTxtAreaTaskDesc').summernote({
                placeholder: 'Hello stand alone ui',
                tabsize: 4,
                height: 200
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
        key: 'setWeekends',
        value: function setWeekends() {
            this.props.addTodo("Weekends", "Saturday", '');
            this.props.addTodo("Weekends", "Sunday", '');
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({
                title: this.title.value,
                description: $(this.description).summernote('code'),
                isWeekend: !this.state.isWeekend,
                dueDate: this.dueDate.value
            });
            console.log(this.state);
        }
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
                if (this.state.isWeekend) {} else {
                    this.props.addTodo(this.state.title, this.senitizeInnerHtml(this.description.value), '', this.dueDate.value);
                }
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
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'inputTxtTaskTitle' },
                            'Task Title'
                        ),
                        _react2.default.createElement('input', { className: 'form-control col-md-12 add-form',
                            id: 'inputTxtTaskTitle',
                            placeholder: 'Enter task title',
                            ref: function ref(title) {
                                return _this2.title = title;
                            },
                            onChange: this.handleChange.bind(this),
                            value: this.state.title
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'inputTxtDueDate' },
                            'Task Due Date'
                        ),
                        _react2.default.createElement('input', { type: 'date',
                            className: 'form-control col-md-12',
                            id: 'inputTxtDueDate',
                            ref: function ref(dueDate) {
                                return _this2.dueDate = dueDate;
                            },
                            onChange: this.handleChange.bind(this),
                            value: this.state.dueDate
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'inputTxtAreaTaskDesc' },
                            'Task Description'
                        ),
                        _react2.default.createElement('textarea', { className: 'form-control col-md-12', name: 'editordata', rows: '5', cols: '50',
                            id: 'inputTxtAreaTaskDesc',
                            placeholder: 'Enter task description',
                            ref: function ref(description) {
                                return _this2.description = description;
                            },
                            onChange: this.handleChange.bind(this),
                            value: this.state.description

                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-right' },
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-primary' },
                            'Submit'
                        )
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.setWeekends, className: 'btn btn-primary' },
                    'Weekends'
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
            'label',
            { htmlFor: 'todoStatus_' + props.todo._id },
            _react2.default.createElement('input', { name: 'todoStatus[]', id: 'todoStatus_' + props.todo._id, type: 'checkbox', value: props.todo._id, onChange: toggleTodoStatus.bind(undefined), checked: props.todo.isDone }),
            ' ',
            props.todo.title,
            ' ',
            _react2.default.createElement(
                'span',
                { className: "badge " + (props.todo.isDone ? 'badge-success' : 'badge-primary') },
                props.todo.status
            )
        ),
        _react2.default.createElement(
            'button',
            { className: 'btn btn-danger float-right', onClick: function onClick() {
                    props.remove(props.todo._id, props.todo.today.split("T")[0].replace(/-/g, ","));
                } },
            'Delete'
        ),
        _react2.default.createElement(
            'button',
            { className: 'btn btn-primary float-right', onClick: function onClick() {
                    props.edit(props.todo._id);
                } },
            'Edit'
        ),
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
        null,
        todoNode
    );
};

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(90);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Putting Things in Context With React ( React Context Example )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://css-tricks.com/putting-things-in-context-with-react/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://reactjs.org/docs/context.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
// Example without using React Context ( Data passing using this.props )
// ====================================================
/*
import React from 'react';

// Grand Child componet
class Button extends React.Component {
    render() {
        return (
            <button style={{ background: this.props.color }}>
                {this.props.children}
            </button>
        );
    }
}

// Child componet
class Message extends React.Component {
    render() {
        console.log('this.props :', this.props);

        return (
            <div>
                {this.props.text} <Button color={this.props.color}>Delete</Button>
            </div>
        );
    }
}

// Grand Child componet
export class MessageList extends React.Component {
    render() {
        const color = 'red';

        let children = this.props.messages.map((message, index) => {
            return (<Message text={message} color={color} key={index} />);
        });

        return <div>{children}</div>;
    }
}
*/

// Example using React Context ( Data passing using this.context )
// ====================================================

// Grand Child componet
var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                { style: { background: this.context.color } },
                this.props.children
            );
        }
    }]);

    return Button;
}(_react2.default.Component);

Button.contextTypes = {
    color: _propTypes2.default.string

    // Child componet
};
var Message = function (_React$Component2) {
    _inherits(Message, _React$Component2);

    function Message() {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
    }

    _createClass(Message, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.text,
                ' ',
                _react2.default.createElement(
                    Button,
                    null,
                    'Delete'
                )
            );
        }
    }]);

    return Message;
}(_react2.default.Component);

// Parent componet


var MessageList = exports.MessageList = function (_React$Component3) {
    _inherits(MessageList, _React$Component3);

    function MessageList() {
        _classCallCheck(this, MessageList);

        return _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).apply(this, arguments));
    }

    _createClass(MessageList, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { color: 'purple' };
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.messages.map(function (message, index) {
                return _react2.default.createElement(Message, { text: message, key: index });
            });

            return _react2.default.createElement(
                'div',
                null,
                children
            );
        }
    }]);

    return MessageList;
}(_react2.default.Component);

MessageList.childContextTypes = {
    color: _propTypes2.default.string
    /**/

};

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(91)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(92)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(5);
var assign = __webpack_require__(7);

var ReactPropTypesSecret = __webpack_require__(17);
var checkPropTypes = __webpack_require__(16);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var ReactPropTypesSecret = __webpack_require__(17);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ })

},[41]);
});
//# sourceMappingURL=app.js.map