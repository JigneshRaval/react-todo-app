import React from 'react';

export const Title = ({ todoCount }) => {
    return (
        <div>
            <div>
                <h1>Todo : {todoCount}</h1>
            </div>
        </div>
    );
}
