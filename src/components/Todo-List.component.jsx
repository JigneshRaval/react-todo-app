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
            <a className="uk-accordion-title uk-box-shadow-hover-small uk-padding" href="#">
                <label htmlFor={'todoStatus_' + props.todo._id}>
                    <input name="todoStatus[]" id={'todoStatus_' + props.todo._id} type="checkbox" value={props.todo._id} onChange={toggleTodoStatus} checked={props.todo.isDone} /> {props.todo.title} <span className={"uk-label " + (props.todo.isDone ? 'uk-label-success' : '')}>{props.todo.status}</span>
                </label>
            </a>
            <div className="uk-accordion-content">

                <div dangerouslySetInnerHTML={createMarkup(props.todo.description)}></div>
                <p>Task Due Date :<span>{props.todo.dateCreated}</span></p>
                <p>Task Created :<span>{props.todo.today.split("T")[0].replace(/-/g, "-")}</span></p>
                <p>Last Modified Date :<span>{props.todo.dateUpdated}</span></p>

                {/* Edit Record */}
                <button className="uk-button uk-button-primary" onClick={() => {
                    props.edit(props.todo._id)
                }}>Edit</button>

                {/* Delete Record */}
                <button className="uk-button uk-button-danger" onClick={() => {
                    props.remove(props.todo._id, props.todo.today.split("T")[0].replace(/-/g, ","))
                }}>Delete</button>

            </div>
        </li>
    );
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

    return <ul uk-accordion="collapsible: true">{todoNode}</ul>;
}
