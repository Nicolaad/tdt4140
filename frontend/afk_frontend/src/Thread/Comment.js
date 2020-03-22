import React from "react";
import "./Comment.css";

function Comment(props){
    const date = new Date(props.date)
    return(
        <div className="comment">
            <div className="commentMetaData">
            <p>{props.username}</p>
            <p>{date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear()+ ", " + date.getHours() +":"+ date.getMinutes()}</p>
            </div>
            <p>{props.postContent}</p>
        </div>
    )
}

export default Comment