import React from 'react';


// PROPS
// sender
// contents
const Note = (props) => {
    return(
        <div className = "container">
            <p>{props.content}</p>
            <p><strong>From: {props.sender}</strong></p>
        </div>
    );
}

export default Note;