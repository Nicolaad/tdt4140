import React from "react";
import axios from "axios";

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
        console.log(this.state)
        axios
            .post('http://127.0.0.1:8000/users/', this.state)
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    alert("User Created");
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { username, email, password } = this.state;
        return (
            <div className="field">
                <h1>Registrer bruker</h1>
                <form onSubmit = {this.submitHandler}>
                    <div>
                        <h2>Brukernavn</h2>
                        <input 
                        type="text" 
                        name="username" 
                        value = {username}
                        onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        <h2>Email</h2>
                        <input 
                        type="text" 
                        name="email" 
                        value = {email}
                        onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        <h2>Passord</h2>
                        <input 
                        type="password" 
                        name="password" 
                        value = {password}
                        onChange = {this.changeHandler}/>
                    </div>
                    <button className = "register-button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm