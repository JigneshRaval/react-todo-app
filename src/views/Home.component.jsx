import React from 'react';
import { Header } from '../components/Header.component';
import { TodoApp } from '../components/Todo.app';
import TodoService from '../components/Todo.service';

const todoService = new TodoService();

export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFormVisible: false,
        }
        this.toggleTodoForm = this.toggleTodoForm.bind(this);
    }

    toggleTodoForm() {
        console.log(this.state.isFormVisible);
        this.setState({ isFormVisible: !this.state.isFormVisible });
        console.log(this.state.isFormVisible);
    }

    render() {
        return (
            <div className="container-fluid">
                <div id="offcanvas-overlay" uk-offcanvas="overlay: false">
                    <div className="uk-offcanvas-bar">

                        <button className="uk-offcanvas-close" type="button" uk-close=""></button>


                        <h3>Title</h3>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    </div>
                </div>

                <Header />

                <div uk-grid="">
                    <div className="uk-width-1-4@m sidebar-nav">
                        <nav className="">
                            <ul>
                                <li><a onClick={this.toggleTodoForm}>Add New Task </a></li>
                                <li><a href="">Completed {this.state.isFormVisible}</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="uk-width-expand@m">
                        <TodoApp todoService={todoService} isFormVisible={this.state.isFormVisible} />
                    </div>
                </div>
            </div>
        );
    }

};
