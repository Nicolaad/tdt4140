import React from "react";
import "./Thread.css";


const axios = require("axios");



function Thread(props) {

    let postVote = (threadID, boolean) => {
        let yourConfig = {
            headers: {
            //Follow the format:  Authorization: 'JWT token
            //eg :
            Authorization: 'JWT '+ localStorage.getItem('token')
         }}
        axios
            .put(
                "http://127.0.0.1:8000/threads/" + threadID + "/vote/", 
                {'upvote': boolean},
                yourConfig 
                
            )
            .then(r => console.log(r.status))
            .catch(e => console.log(e));
        }
        return (
            <div className="threadBody">

                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
            <p>dato: {props.dateCreated}</p>
                <p>
                    {props.postContent}
                </p>
        <button onClick={() => postVote(props.threadID, "False")}>Downvote:{props.downvoteCount}</button>
        <button onClick={() => postVote(props.threadID, "True")}>Upvote:{props.upvoteCount}</button>
            </div>
        )
    }

export default Thread;