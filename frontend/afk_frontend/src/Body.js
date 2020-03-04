import React from "react";
import axios from "axios";
import Modal from "./Modal/Modal";
import ThreadPost from "./Thread/ThreadPost";
import "./Body.css";
import Thread from "./Thread/Thread";

class Body extends React.Component {
    state = {
        threads: []
    }

    async componentDidMount(){
        console.log('body mounted!')
        const token = {
            headers: {
            Authorization: 'JWT '+ localStorage.getItem('token')
         }} 

        try {
             const result = await axios.get('http://127.0.0.1:8000/threads/', token)
             this.setState({ threads: [...result.data.results]})
             
        } catch(e){
            console.log(e)
        }
    }   
    render () {
        let threadList = <p>Ingen threads</p>
        if (this.state.threads){
            threadList = this.state.threads.map((thread, i) => 
            <Thread key={i}
                ownername={thread.ownername}
                title={thread.title}
                dateCreated={thread.dateCreated}
                postContent={thread.postContent}
            />)
        }
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
                {threadList}
            </div>
        )
    }
}

export default Body;