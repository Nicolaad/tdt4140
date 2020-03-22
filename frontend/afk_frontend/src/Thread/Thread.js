import React from "react";
import "./Thread.css";



function Thread(props) {
    const date = new Date(props.dateCreated)
        return (
            <div className="threadBody">

                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
            <p>{date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear()+ ", " + date.getHours() +":"+ date.getMinutes()}</p>
                <p>
                    {props.postContent}
                </p>
            </div>
        )
    }

export default Thread;