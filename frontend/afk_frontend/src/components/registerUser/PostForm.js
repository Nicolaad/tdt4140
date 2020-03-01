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
                if (response.status === 201) {
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
                <div className="field-wrapper">
                    <h1>Registrer bruker</h1>
                    <form onSubmit = {this.submitHandler}>
                        <div className="username">
                            <label htmlFor="username">Brukernavn</label>
                            <input 
                                type="text"
                                placeholder="Brukernavn"
                                name="username" 
                                value = {username}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text"
                                placeholder="Email"
                                name="email" 
                                value = {email}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Passord</label>
                            <input 
                                type="password" 
                                placeholder="Passord"
                                name="password" 
                                value = {password}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <button className="buttonfx" type="submit">Opprett bruker</button>
                        <button className="alreadyUser" type="submit">Allerede opprettet en bruker?</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PostForm