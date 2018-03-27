export default class TodoService {
    constructor() {
        this.todos = [];
    }

    getAllTodos(url) {
        // Render all Todo items on component render
        return fetch(url)
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                this.todos = response.json();
                return this.todos;
            });
    }

    addUpdateTodo(url, method, dataObject) {
        return fetch(url, {
            method: method,
            body: JSON.stringify(dataObject),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                this.todos = response.json();
                return this.todos;
                // response.json()
            })
    }

    removeTodo(url, dataObject) {
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
        })
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                this.todos = response.json();
                return this.todos;
            })
            .catch((err) => {
                console.log('Removed Todo item successfully from database.', err);
            });
    }
}
