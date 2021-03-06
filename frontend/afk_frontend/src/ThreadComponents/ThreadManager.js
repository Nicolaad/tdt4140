import React from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import ThreadPost from "./ThreadPost";
import "../Styles/Body.css";
import Thread from "./Thread";

class ThreadManager extends React.Component {
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
             const result = await axios.get(localStorage.getItem("djangoUrl") + "threads/")
             this.setState({ threads: [...result.data.results]})
             
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
            <div key={thread.id}>
                <Modal 
                modalProps={{ triggerText: 
                    <div>
                        <Thread
                            isFullThread={false}
                            isAuthenticated={this.props.isAuthenticated}
                            username={this.props.username}
                            currentUserVote={thread.current_user_vote}
                            updateThreads={this.fetchThreads}
                            threadID={thread.id}
                            downvoteCount={thread.downvotes}
                            upvoteCount={thread.upvotes}
                            ownername={thread.ownername}
                            title={thread.title}
                            dateCreated={thread.dateCreated}
                            postContent={thread.postContent}
                        />
                    </div>
                    ,isFullThread:true, id:thread.id, isAuthenticated:this.props.isAuthenticated}}
                        modalContent={
                            <div className="clickedThread">
                                <Thread
                                    isFullThread={true}
                                    isAuthenticated={this.props.isAuthenticated}
                                    username={this.props.username}
                                    currentUserVote={thread.current_user_vote}
                                    updateThreads={this.fetchThreads} 
                                    threadID={thread.id}
                                    downvoteCount={thread.downvotes}
                                    upvoteCount={thread.upvotes}
                                    ownername={thread.ownername}
                                    title={thread.title}
                                    dateCreated={thread.dateCreated}
                                    postContent={thread.postContent}/>
                            </div>}
                />
            </div>
            )
        }
        return (
            <div className="contentBody">
                {this.props.isAuthenticated ? 
                 <div className="threadCreateButton">
                 <Modal
                 modalProps={{triggerText: "Opprett tråd"}} 
                 modalContent={<ThreadPost isEditing={false} updateThreads={this.fetchThreads}/>} />
             </div>
             :
             <div></div>
             }
                {threadList}
            </div>
        )
    }
}

export default ThreadManager;