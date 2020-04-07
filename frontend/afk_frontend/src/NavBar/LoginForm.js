import React, {Component} from "react";
import axios from 'axios';
import "../Styles/Login.css";
import "../Styles/Body.css";
//import './Login.css'; temp removed, as it need fixing

export default class LoginForm extends Component{
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
    
        var tokenAuthUrl = localStorage.getItem("djangoUrl") + "token-auth/";
    
        axios
        .post(tokenAuthUrl, this.state)
        .then(response => {
            if (response.status == 200) {
                //close popupp by calling the the close modal button
                document.getElementsByClassName("_modal-close")[0].click();
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('username', response.data.user.username);
                this.props.authenticateFunction();
                

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