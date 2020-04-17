import "../Styles/Thread.css";
import React, { useState } from "react";
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
            Authorization: 'JWT '+ sessionStorage.getItem('token')
         }}
        axios
            .delete(localStorage.getItem("djangoUrl")+"threads/" + threadID, token)
            .then(response => {
                console.log(response)
                if (response.status === 204) {
                    document.getElementsByClassName("_modal-close")[0].click()
                    props.updateThreads()
                }
            })
    }


    
    //used by up/downvote buttons
    /* disabled as up/downvotes are deactivated
    let postVote = (threadID, boolean, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let token = {
            headers: {
            Authorization: 'JWT '+ sessionStorage.getItem('token')
         }}
        axios
            .put(
                localStorage.getItem("djangoUrl")+"threads/" + threadID + "/vote/", 
                {'upvote': boolean},
                token 
            )
            .then(r => console.log(r.status))
            .catch(e => console.log(e));
    }
    */


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
                    cancelButton={<button className="button1" onClick={toggleTrueFalse}>Avbryt</button>}></ThreadPost>

                </div> :
                
                <div>
                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
                <p>{displayDate}</p>
                <p>{props.postContent}</p>
                
                {/* temporarily disabled as the up/downVotes does contain some bugs that needs to be ironed out before implementation }
                <button className="button1" onClick={(ev) => postVote(props.threadID, "False", ev)}>Downvote:{props.downvoteCount}</button>
                <button className="button1" onClick={(ev) => postVote(props.threadID, "True", ev)}>Upvote:{props.upvoteCount}</button>
                */}
                
                {props.username === props.ownername&& props.isFullThread   ? 
                <div>
                <button className="button1" onClick={(ev) => toggleTrueFalse(ev)}>Rediger</button>
                <button className="button1" onClick={(ev) => deleteThread(props.threadID, ev)}>Slett</button> </div>
                :
                null
                }
                </div>
            }
            </div>       
        )
    }

export default Thread;