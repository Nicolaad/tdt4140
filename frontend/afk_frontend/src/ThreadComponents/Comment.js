import React from "react";
import "../Styles/Comment.css";

function Comment(props){
    const date = new Date(props.date)
    let displayDate = date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear()+ ", " + date.getHours() + ":"
    if (date.getMinutes()<10 ){
        displayDate = displayDate + "0"
    }
    displayDate = displayDate + date.getMinutes()
    return(
        <div className="comment">
            <div className="commentMetaData">
            <p>{props.username}</p>
            <p>{displayDate}</p>
            </div>
            <div className="commentContent">
            <p>{props.postContent}</p>
            </div>
        </div>
    )
}

export default Comment