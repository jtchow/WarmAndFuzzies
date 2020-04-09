import React from 'react';


// PROPS
// sender
// contents
const Note = (props) => {
    return(
        <div className = "container">
            <p>{props.content}</p>
            <h4><strong>{props.sender}</strong></h4>
        </div>
    );
}

export default Note;