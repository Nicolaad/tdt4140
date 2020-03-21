import React from "react";

function Comment(props){
    return(
        <div className="comment">
            <p>{props.username}</p>
            <p>{props.date}</p>
            <p>{props.postContent}</p>
        </div>
    )
}

export default Comment