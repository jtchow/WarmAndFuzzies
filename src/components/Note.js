import React from 'react';

const Note = (props) => {
    return(
        <div className="card" style={{"width": "18rem"}}>
        <div className="card-body">
          <p className="card-text">{props.content}</p>
        </div>
      </div>
    );
}

export default Note;