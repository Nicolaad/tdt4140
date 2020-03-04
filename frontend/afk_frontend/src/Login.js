import React, {Component} from "react";
import axios from 'axios';
import "./Login.css";
import "./Body.css";
//import './Login.css'; temp removed, as it need fixing

export default class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
        
    handleFormSubmit = event => {
        event.preventDefault();
    
        var apiBaseUrl ="http://127.0.0.1:8000/token-auth/";
    
        axios
        .post(apiBaseUrl, this.state)
        .then(response => {
            if (response.status == 200) {
                document.querySelector('html').classList.toggle('scroll-lock');
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.user.username)
                this.props.authenticateFunction()
                alert("Du er logget inn");
                

            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render(){
        return(
                <div className="loginDiv">
                    <h1>Innlogging</h1>
                    <label htmlFor = "username">Brukernavn</label>
                    <br />
                    <input 
                        id="brukernavnregistrer"
                        type = "text" 
                        name = "username" 
                        className = "inputbox"
                        onChange = {this.changeHandler}/>
                    <br />
                    <label htmlFor = "password">Passord</label>
                    <br />
                    <input 
                        type = "password" 
                        name = "password"  
                        className = "inputbox"
                        onChange = {this.changeHandler}/> 
                    <br />       
                    <br />
                    <button className = "button1" type = "button" onClick={this.handleFormSubmit}> Logg inn </button>
                </div>
      );
    }
}