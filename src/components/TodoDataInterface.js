export default class TodoDataInterface {
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
}
