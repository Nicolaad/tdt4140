import React from "react";
import axios from "axios";
import Modal from "./Modal/Modal";
import ThreadPost from "./Thread/ThreadPost";
import "./Body.css";
import Thread from "./Thread/Thread";

class Body extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            threads: []
        }
        this.fetchThreads = this.fetchThreads.bind(this)
    }
    
    async componentDidMount(){
        this.fetchThreads()
    }
    
    async fetchThreads(){
    

        try {
             const result = await axios.get('http://127.0.0.1:8000/threads/')
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
            />
            )
        }
        return (
            <div className="contentBody">
                {this.props.isAuthenticated ? 
                 <div className="threadCreateButton">
                 <Modal
                 modalProps={{triggerText: "Opprett tråd"}} 
                 modalContent={<ThreadPost updateThreads={this.fetchThreads}/>} />
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