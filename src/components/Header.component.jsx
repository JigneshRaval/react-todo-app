import React from 'react';
import { Link, Route } from 'react-router-dom';

export const Header = () => {
    return (
        <nav className="uk-navbar-container" uk-navbar="">

            <div className="uk-navbar-item">
                <a className="uk-navbar-toggle" href="#offcanvas-overlay" uk-toggle="">
                    <span uk-navbar-toggle-icon=""></span> <span className="uk-margin-small-left">Menu</span>
                </a>
            </div>

            <h5 className="uk-navbar-item app-title">TODO Application</h5>

            <div className="uk-navbar-right">

                <HeaderNavigation />

            </div>

        </nav>

    )
}

const HeaderNavigation = () => {
    //render() {
    return (
        <ul className="uk-navbar-nav">
            <li className="uk-active">
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About Us</Link>
                <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                        <li className="uk-active"><a href="#">Active</a></li>
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Item</a></li>
                    </ul>
                </div>
            </li>
            <li><Link to="/topics">Topics</Link></li>
        </ul>
    );
    //};
}
