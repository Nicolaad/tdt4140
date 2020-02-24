import React from "react";
import axios from "axios";
import "./PostForm.css";

class PostForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userID: '',
            title: '',
            body: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('https://jsonplaceholder.typicode.com/posts', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { userID, title, body } = this.state;
        return (
            <div className="field">
                <h1>Registrer bruker</h1>
                <form onSubmit = {this.submitHandler}>
                    <div>
                        <h2>Brukernavn</h2>
                        <input 
                        type="text" 
                        name="userID" 
                        value = {userID}
                        onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        <h2>Email</h2>
                        <input 
                        type="text" 
                        name="title" 
                        value = {title}
                        onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        <h2>Passord</h2>
                        <input 
                        type="password" 
                        name="body" 
                        value = {body}
                        onChange = {this.changeHandler}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm