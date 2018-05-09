import React from 'react';

// 3. Single Todo item
// ==============================
const SingleTodo = (props) => {
    // props = { todo, remove, edit, complete }

    let toggleTodoStatus = (event) => {
        console.log('Hi', event.target);
        if (event.target.checked) {
            props.complete(props.todo._id, event.target.checked);
        } else {
            props.complete(props.todo._id, event.target.checked);
        }

    }

    function createMarkup(htmlContent) {
        return { __html: htmlContent };
    }

    // Each Todo
    return (
        <li className={"list-group-item " + (props.todo.isDone ? "done" : "")}>
            <label htmlFor={'todoStatus_' + props.todo._id}>
                <input name="todoStatus[]" id={'todoStatus_' + props.todo._id} type="checkbox" value={props.todo._id} onChange={toggleTodoStatus.bind(this)} checked={props.todo.isDone} /> {props.todo.title} <span className={"badge " + (props.todo.isDone ? 'badge-success' : 'badge-primary')}>{props.todo.status}</span>
            </label>

            <button className="btn btn-danger float-right" onClick={() => { props.remove(props.todo._id, props.todo.today.split("T")[0].replace(/-/g, ",")) }}>Delete</button>
            <button className="btn btn-primary float-right" onClick={() => { props.edit(props.todo._id) }}>Edit</button>
            <div dangerouslySetInnerHTML={createMarkup(props.todo.description)}></div>
            <p>Date Created :<span>{props.todo.today.split("T")[0]}</span></p>
        </li>);
}


export const TodoList = (props) => {
    let todoNode;
    {
        props.visibleTodos[props.k].length > 0 ?
            (
                todoNode = props.visibleTodos[props.k].map((todo, indexOuter) => {
                    return (<SingleTodo todo={todo} key={todo._id} remove={props.remove} edit={props.edit} complete={props.complete} />)
                })
            ) : (
                todoNode = (<li className="list-group-item">Nothing here</li>)
            )
    }

    return <ul>{todoNode}</ul>;
}
