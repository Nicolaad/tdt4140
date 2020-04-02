import "./Thread.css";
import EditPost from "../EditPost";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import axios from "axios";
import ThreadPost from "./ThreadPost";

function Thread(props) {
    const [isToggled, setToggled] = useState(false);

    let toggleTrueFalse =  (e) => {
    setToggled(!isToggled);
    }

    let deleteThread = (threadID, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let token = {
            headers: {
            //Follow the format:  Authorization: 'JWT token
            //eg :
            Authorization: 'JWT '+ sessionStorage.getItem('token')
         }}
        axios
            .delete("http://127.0.0.1:8000/threads/" + threadID, token)
            .then(response => {
                console.log(response)
                if (response.status == 204) {
                    
                    props.updateThreads()
                }
            })
    }


    

    let postVote = (threadID, boolean, e) => {
            
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let token = {
            headers: {
            //Follow the format:  Authorization: 'JWT token
            //eg :
            Authorization: 'JWT '+ sessionStorage.getItem('token')
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

    const date = new Date(props.dateCreated)
    let displayDate = date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear()+ ", " + date.getHours() + ":"
    if (date.getMinutes()<10 ){
        displayDate = displayDate + "0"
    }
    displayDate = displayDate + date.getMinutes()

        return (
            <div className="threadBody">
                {isToggled ? 
                <div>
                    <ThreadPost
                    threadID={props.threadID}
                    postTitle={props.title}
                    postContent={props.postContent}
                    isEditing={true}
                    updateThreads={props.updateThreads}
                    toggleTrueFalse={toggleTrueFalse}
                    cancelButton={<button className="button1" onClick={toggleTrueFalse}>Cancel</button>}></ThreadPost>

                </div> :
                
                <div>
                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
                <p>{displayDate}</p>
                <p>{props.postContent}</p>

                <button className="button1" onClick={(ev) => postVote(props.threadID, "False", ev)}>Downvote:{props.downvoteCount}</button>
                <button className="button1" onClick={(ev) => postVote(props.threadID, "True", ev)}>Upvote:{props.upvoteCount}</button>
                
                
                {props.username == props.ownername&& props.isFullThread   ? 
                <div>
                <button className="button1" onClick={(ev) => toggleTrueFalse(ev)}>Edit</button>
                <button className="button1" onClick={(ev) => deleteThread(props.threadID, ev)}>Delete</button> </div>
                :
                <p></p>
                }
                </div>
            }
            </div>       
        )
    }

export default Thread;