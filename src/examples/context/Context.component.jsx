/**
 * Putting Things in Context With React ( React Context Example )
 * https://css-tricks.com/putting-things-in-context-with-react/
 *
 * https://reactjs.org/docs/context.html
 */
// Example without using React Context ( Data passing using this.props )
// ====================================================
/*
import React from 'react';

// Grand Child componet
class Button extends React.Component {
    render() {
        return (
            <button style={{ background: this.props.color }}>
                {this.props.children}
            </button>
        );
    }
}

// Child componet
class Message extends React.Component {
    render() {
        console.log('this.props :', this.props);

        return (
            <div>
                {this.props.text} <Button color={this.props.color}>Delete</Button>
            </div>
        );
    }
}

// Grand Child componet
export class MessageList extends React.Component {
    render() {
        const color = 'red';

        let children = this.props.messages.map((message, index) => {
            return (<Message text={message} color={color} key={index} />);
        });

        return <div>{children}</div>;
    }
}
*/

// Example using React Context ( Data passing using this.context )
// ====================================================

import React from 'react';
import PropTypes from 'prop-types';

// Grand Child componet
class Button extends React.Component {
    render() {
        return (
            <button style={{ background: this.context.color }}>
                {this.props.children}
            </button>
        );
    }
}

Button.contextTypes = {
    color: PropTypes.string
}

// Child componet
class Message extends React.Component {
    render() {
        return (
            <div>
                {this.props.text} <Button>Delete</Button>
            </div>
        );
    }
}

// Parent componet
export class MessageList extends React.Component {
    getChildContext() {
        return { color: 'purple' };
    }

    render() {
        const children = this.props.messages.map((message, index) => {
            return (<Message text={message} key={index} />);
        });

        return <div>{children}</div>
    }
}

MessageList.childContextTypes = {
    color: PropTypes.string
}
/**/
