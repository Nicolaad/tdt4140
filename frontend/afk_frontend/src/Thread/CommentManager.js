import React, {useState} from 'react'
import Comment from "../Thread/Comment"
import axios from "axios";

class CommentManager extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments: null
        }

    }
    async componentDidMount(){
        this.fetchComments()
    }
    
    async fetchComments(){
        try {
            const result = await axios.get('http://127.0.0.1:8000/comments?thread='+this.props.id)
            if (result.status == 200){
                this.setState({ comments: [...result.data]})
                console.log(this.state.comments)
            }
       } catch(e){
           console.log(e)
       }

    }
    render () {
        let commentList = <p>Ingen komentarer</p>
        if (this.state.comments){
            console.log(this.state.comments)
            commentList = this.state.comments.map((comment) => 
            <Comment key={comment.url.match(/([^\/]*)\/*$/)[1]} username={comment.username} date={comment.date} postContent={comment.postContent}></Comment>
            )
        }else{
            
        }
        return (
            <div>
            {commentList}
            </div>
        )
    }
}
export default CommentManager