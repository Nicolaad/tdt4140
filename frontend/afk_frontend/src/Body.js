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
        this.fetchComments = this.fetchComments.bind(this)
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
    async fetchComments(){
        try {
            let index =1;
            const result = await axios.get('http://127.0.0.1:8000/comments?thread='+index)
            return ([...result.data])
            
       } catch(e){
           console.log(e)
       }

    }
    //todo: add comments and style into clickedThread div   
    render () {
        let threadList = <p>Ingen threads</p>
        if (this.state.threads){
            threadList = this.state.threads.map((thread) => 
            //note the duplicate <Thread/>, first one representing the clicable text -
            // the second represents the displayed text when clicked
            <Modal key = {thread.url.match(/([^\/]*)\/*$/)[1]}
            modalProps={{ triggerText: <div><Thread
                ownername={thread.ownername}
                title={thread.title}
                dateCreated={thread.dateCreated}
                postContent={thread.postContent}
            ></Thread></div>, isNotButton:true, id:thread.url.match(/([^\/]*)\/*$/)[1], isAuthenticated:this.props.isAuthenticated}}
            modalContent={<div className="clickedThread"><Thread
                ownername={thread.ownername}
                title={thread.title}
                dateCreated={thread.dateCreated}
                postContent={thread.postContent}/>
                </div>}
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