import React from "react";
import axios from "axios";
import "../Body.css";

class PostForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: ''
        }
        
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        axios
            .post(localStorage.getItem("djangoUrl") + "users/", this.state)
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    document.getElementsByClassName("_modal-close")[0].click();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="registerDiv">
                <h1>Registrer bruker</h1>
                <form onSubmit = {this.submitHandler}>
                    <div>
                        <label>Brukernavn</label>
                        <br />
                        <input 
                        type="text" 
                        name="username"
                        className="inputbox"
                        onChange = {this.changeHandler}/>
                    </div>
                    <br />
                    <div>
                        <label>Email</label>
                        <br />
                        <input 
                        type="text" 
                        className="inputbox"
                        name="email" 
                        onChange = {this.changeHandler}/>
                    </div>
                    <br />
                    <div>
                        <label>Passord</label>
                        <br />
                        <input 
                        type="password"
                        className="inputbox"
                        name="password" 
                        onChange = {this.changeHandler}/>
                    </div>
                    <br />
                    <button className = "button1" type="button" onClick={this.submitHandler}> Registrer</button>
                </form>
            </div>
        )
    }
}

export default PostForm