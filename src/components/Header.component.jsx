import React from 'react';
import { Link, Route } from 'react-router-dom';

export const Header = () => {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 className="my-0 mr-md-auto font-weight-normal">TODO Application</h5>
            <HeaderNavigation />
            <a className="btn btn-outline-primary" href="#">Login</a>
        </div>
    )
}

const HeaderNavigation = () => {
    //render() {
        return (
            <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-dark" to="/">Home</Link>
                <Link className="p-2 text-dark" to="/about">About Us</Link>
                <Link className="p-2 text-dark" to="/topics">Topics</Link>
            </nav>
        );
    //};
}
