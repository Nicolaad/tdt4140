import React from "react";
import "./Thread.css";



function Thread(props) {
        return (
            <div className="threadBody">

                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
            <p>dato: {props.dateCreated}</p>
                <p>
                    {props.postContent}
                </p>
            </div>
        )
    }

export default Thread;