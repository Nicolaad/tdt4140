import React from "react";
import "./Thread.css";


const axios = require("axios");



function Thread(props) {

    const date = new Date(props.dateCreated)
    let displayDate = date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear()+ ", " + date.getHours() + ":"
    if (date.getMinutes()<10 ){
        displayDate = displayDate + "0"
    }
    displayDate = displayDate + date.getMinutes()

    let postVote = (threadID, boolean, e) => {
        
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
        let token = {
            headers: {
            //Follow the format:  Authorization: 'JWT token
            //eg :
            Authorization: 'JWT '+ localStorage.getItem('token')
         }}
        axios
            .put(
                "http://127.0.0.1:8000/threads/" + threadID + "/vote/", 
                {'upvote': boolean},
                token 
            )
            .then(r => console.log(r.status))
            .catch(e => console.log(e));
        }

        return (
            <div className="threadBody">
                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
            <p>{displayDate}</p>
                <p>
                    {props.postContent}
                </p>
                <button onClick={(ev) => postVote(props.threadID, "False", ev)}>Downvote:{props.downvoteCount}</button>
                <button onClick={(ev) => postVote(props.threadID, "True", ev)}>Upvote:{props.upvoteCount}</button>
            </div>
        )
    }

export default Thread;