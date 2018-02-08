import React from 'react';

export const Title = ({ todoCount }) => {
    return (
        <div>
            <div>
                <h1>to-do ({todoCount})</h1>
            </div>
        </div>
    );
}
