import React from "react";
import Modal from "./Modal/Modal";
import ThreadPost from "./Thread/ThreadPost";
import "./Body.css";

class Body extends React.Component {

    render () {
        return (
            <div className="contentBody">
                <div className="threadCreateButton">
                    <Modal
                    modalProps={{triggerText: "Opprett tråd"}} 
                    modalContent={<ThreadPost />} />
                </div>
            </div>
        )
    }
}

export default Body;