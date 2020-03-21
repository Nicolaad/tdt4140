import React, {useState} from 'react'
import Comment from "../Thread/Comment"
import axios from "axios";

class CommentManager extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments: null,
            title:"",
            postContent:""
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

    submitHandler = (e) => {
        e.preventDefault()
        let token = {
            headers: {
            Authorization: 'JWT '+ localStorage.getItem('token')
         }}
         let testComment= {
            title: "første kommentar",
            postContent: this.state.postContent,
            thread: this.props.id
         } 
        axios
            .post('http://127.0.0.1:8000/comments/',testComment, token)
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    this.fetchComments()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render () {
        let commentList = <p>Ingen komentarer</p>
        if (this.state.comments){
            console.log(this.state.comments)
            commentList = this.state.comments.map((comment) => 
            <Comment key={comment.url.match(/([^\/]*)\/*$/)[1]} username={comment.ownername} date={comment.dateCreated} postContent={comment.postContent}></Comment>
            )
        }else{
            
        }
        return (
            <div>
                <div>
                {commentList}
                </div>
                <div className="field">
                <form onSubmit = {this.submitHandler} id="commentPost">
                </form>
                <textarea
                    rows="12"
                    cols="64"
                    className="inputbox"
                    name="postContent"
                    form="commentPost"
                    placeholder="Skriv her..."
                    id = "postContent"
                    onChange= {this.changeHandler}>
                </textarea>
                <button 
                    className = "button1"
                    id="postCommentButton" 
                    type="submit" 
                    form="commentPost">
                    Publiser
                </button>
            </div>
            </div>
        )
    }
}
export default CommentManager

