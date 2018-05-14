import React from 'react';

export const SearchTodoItem = (props) => {
    const filterList = (event) => {

        let filteredData = {};

        Object.keys(props.initialData).map(date => {
            props.initialData[date].filter(todo => {
                if (todo.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
                    if (filteredData.hasOwnProperty(date)) {
                        filteredData[date].push(todo);
                    } else {
                        filteredData[date] = [todo];
                    }
                }
            })
        });

        props.updateFilter(filteredData);
        //return filteredData;

    };

    return <input type="text" className="uk-input" placeholder="Search" onChange={filterList} />

}

// <SearchTodoItem data={this.state.data} initialData={this.state.initialData} />
