import React from "react";
import "./Thread.css";
import EditPost from "../EditPost";
import Modal from "../Modal/Modal";
import axios from "axios";


function Thread(props) {  
    
    return (
            <div className="threadBody">

                <h2>{props.ownername}</h2>
                <h2>{props.title}</h2>
            <p>dato: {props.dateCreated}</p>
                <p>
                    {props.postContent}
                </p>
                <div className = "editbutton">
                    <Modal
                    modalProps={{triggerText: "Rediger"}} 
                    modalContent={<EditPost />} />
                </div>
            </div>
        )
    }

export default Thread;