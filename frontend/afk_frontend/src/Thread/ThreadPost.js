import React from "react";
import axios from "axios";
import "../Body.css";

class ThreadPost extends React.Component {

    constructor(props) {
        super(props)
        if (this.props.isEditing){
            this.state = ({title: this.props.postTitle,
            postContent: this.props.postContent})
        }
        else {
            this.state = {
                title: ""
            }
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    postEdit= (e) =>  {
        e.preventDefault()
        console.log("postedit running")
        console.log(this.props.threadID)
        let token = {
            headers: {
            Authorization: 'JWT '+ sessionStorage.getItem('token')
         }}
         axios
            .put(
                "http://127.0.0.1:8000/threads/" + this.props.threadID + "/", this.state, token 
                
            )
            .then(r =>{
                 console.log(r.status)
                 this.props.updateThreads()
                 this.props.toggleTrueFalse()
            })
            .catch(e => console.log(e));
    }

    submitHandler = (e) => {
        console.log("submitt")
        e.preventDefault()
        console.log(this.state)
        let token = {
            headers: {

            Authorization: 'JWT '+ sessionStorage.getItem('token')
         }}
        axios
            .post('http://127.0.0.1:8000/threads/', this.state, token)
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    //close pop-up by calling the the close modal button
                    document.getElementsByClassName("_modal-close")[0].click()
                    this.props.updateThreads()
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { title, text } = this.state;
        return (
            <div className="field">
            <form onSubmit = {this.props.isEditing ? 
            this.postEdit
            :
            this.submitHandler} id="threadPost">
                <div>
                    <h2>{this.props.isEditing ? 
                    "" :
                    "Opprett tråd" }</h2>
                    <input 
                    type="text" 
                    name="title" 
                    className="inputbox"
                    id={this.props.isEditing ?  "threadEditingTitle" : "threadPostTitle" }
                    defaultValue = {this.props.isEditing ? 
                        this.props.postTitle :
                        "" }
                    placeholder = "Tittel"
                    onChange = {this.changeHandler}/>
                </div>
            
            <textarea
                rows="12"
                cols="50"
                className="inputbox"
                name="postContent"
                form="threadPost"
                placeholder="Skriv her"
                defaultValue={this.props.postContent}
                id = {this.props.isEditing ?  "threadEditingContent" : "threadPostContent" }
                onChange= {this.changeHandler}>{text}
            </textarea>
            <div className="threadPostButtons">
                {this.props.cancelButton}
                <button 
                    className = "button1"
                    type="submit" 
                    form="threadPost">
                    Publiser
                </button>
                
            </div>
            
            </form>
            
        </div>
        )
    }
}

export default ThreadPost