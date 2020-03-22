import React from "react";
import "./Thread.css";



function Thread(props) {
    const date = new Date(props.dateCreated)
    let displayDate = date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear()+ ", " + date.getHours() + ":"
    if (date.getMinutes()<10 ){
        displayDate = displayDate + "0"
    }
    displayDate = displayDate + date.getMinutes()
        return (
            <div className="threadBody">

                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
            <p>{displayDate}</p>
                <p>
                    {props.postContent}
                </p>
            </div>
        )
    }

export default Thread;