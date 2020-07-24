import React from 'react';

const Note = (props) => {
  console.log("Anony?" + props.anonymous)
    const signature = (<h6 className = "card-subtitle">- {props.sender}</h6>)
    return(
        <div className="card" style={{"width": "18rem"}}>
        <div className="card-body">
          <p className="card-text">{props.content}</p>
          {!props.anonymous && signature}
        </div>
      </div>
    );
}

export default Note;