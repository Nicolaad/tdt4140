import React from 'react'
import Comment from "../Thread/Comment"
import axios from "axios";

class CommentManager extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments: null,
            postContent:""
        }
    }
    async componentDidMount(){
        this.fetchComments()
    }
    
    async fetchComments(){
        try {
            const result = await axios.get(localStorage.getItem("djangoUrl")+"comments?thread="+this.props.id)
            if (result.status === 200){
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
            Authorization: 'JWT '+ sessionStorage.getItem('token')
         }}
         let commentData= {
             title: "disabled", 
            postContent: this.state.postContent,
            thread: this.props.id
         } 
        axios
            .post(localStorage.getItem("djangoUrl") + "comments/",commentData, token)
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    this.fetchComments()
                    this.setState({postContent:""})
                    document.getElementById("postComment").value=""
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
        let commentList = <p>Her er det ingen episke kommentarer :(</p>
        if (this.state.comments){
            commentList = this.state.comments.map((comment) => 
            <Comment key={comment.url.match(/([^\/]*)\/*$/)[1]} username={comment.ownername} date={comment.dateCreated} postContent={comment.postContent}></Comment>
            )
        }
        let commentInput = ""
        if (this.props.isAuthenticated){
            commentInput= <div className="field">
                    <form onSubmit = {this.submitHandler} id="commentPost">
                    </form>
                    <textarea
                        className="commentInputBox"
                        name="postContent"
                        form="commentPost"
                        placeholder="Skriv en kommentar her"
                        id = "postComment"
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
                }

        
        return (
            <div>
                <div>
                {commentList}
                </div>
                {commentInput}
            
            </div>
                
        )
    }
}
export default CommentManager

