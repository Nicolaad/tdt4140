import React from "react";
import axios from "axios";
import "../Body.css";

class ThreadPost extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        let token = {
            headers: {

            Authorization: 'JWT '+ localStorage.getItem('token')
         }}
         //swapp out this.state below with testComment to make a test comment
         let testComment= {
            title: "første kommentar",
            postContent: "her er den 2 kommentarteksten",
            thread: "2"
         } 
        axios
            .post('http://127.0.0.1:8000/comments/', this.state, token)
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    //close popupp by calling the the close modal button
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
                <form onSubmit = {this.submitHandler} id="threadPost">
                    <div>
                        <h2>Opprett tråd</h2>
                        <input 
                        type="text" 
                        name="title" 
                        className="inputbox"
                        id="threadtitle"
                        value = {title}
                        placeholder = "Tittel"
                        onChange = {this.changeHandler}/>
                    </div>
                </form>
                <textarea
                    rows="12"
                    cols="64"
                    className="inputbox"
                    name="postContent"
                    form="threadPost"
                    placeholder="Skriv her..."
                    id = "postContent"
                    onChange= {this.changeHandler}>{text}
                </textarea>
                <button 
                    className = "button1"
                    id="postthreadbutton" 
                    type="submit" 
                    form="threadPost">
                    Publiser
                </button>
            </div>
        )
    }
}

export default ThreadPost