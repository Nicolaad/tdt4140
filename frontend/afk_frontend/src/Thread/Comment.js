import React from "react";
import "./Comment.css";

function Comment(props){
    return(
        <div className="comment">
            <div className="commentMetaData">
            <p>{props.username}</p>
            <p>{props.date}</p>
            </div>
            <p>{props.postContent}</p>
        </div>
    )
}

export default Comment