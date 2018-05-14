import React from 'react';
import { Header } from '../components/Header.component';
import { TodoApp } from '../components/Todo.app';
import TodoService from '../components/Todo.service';

const todoService = new TodoService();

export const HomeView = () => {

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
                <div className="uk-width-1-4@m">
                    <nav className="sidebar-nav">
                        <ul>
                            <li><a href="">Completed</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="uk-width-expand@m">
                    <TodoApp todoService={todoService} />
                </div>
            </div>
        </div>
    );

};
