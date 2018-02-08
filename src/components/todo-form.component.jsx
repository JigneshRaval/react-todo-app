import React from 'react';

export const TodoForm = ({ addTodo }) => {
    // Input Tracker
    let input;

    /*
    const formAddTodo = (event) => {
        event.preventDefault();
        addTodo(input.value);
        input.value = '';
    }
    */

    // Return JSX
    return (
        // <form onSubmit={formAddTodo}>
        <form onSubmit={(e) => {
            e.preventDefault();
            addTodo(input.value);
            input.value = '';
        }}>
            <input className="form-control col-md-12" ref={node => {
                console.log("input :", input, node);
                input = node;
            }} />
            <br />
        </form>
    );
};
