import React from "react";
import Modal from "./Modal/Modal";
import ThreadPost from "./Thread/ThreadPost";
import "./Body.css";
import Thread from "./Thread/Thread";

class Body extends React.Component {

    render () {
        return (
            <div className="contentBody">
                {this.props.isAuthenticated ? 
                 <div className="threadCreateButton">
                 <Modal
                 modalProps={{triggerText: "Opprett tråd"}} 
                 modalContent={<ThreadPost />} />
             </div>
             :
             <div></div>
             }
               
                <Thread />
            </div>
        )
    }
}

export default Body;