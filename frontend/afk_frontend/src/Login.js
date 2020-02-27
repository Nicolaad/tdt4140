import React, {Component} from "react";
import axios from 'axios';
import './Login.css';

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
            console.log(response)
            if (response.status == 201) {
                alert("Du er logget inn");
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render(){
        return(
          <div className="popup">
            <div className="popup\_inner">
              <span>
                <div id = "content">
                  <h1>Innlogging</h1>
                  <label htmlFor = "username">Brukernavn</label>
                  <input type = "text" name = "username" placeholder = "Skriv her..." onChange = {this.changeHandler}/>
                  <br/>
                  <label htmlFor = "password">Passord</label>
                  <input type = "password" name = "password" placeholder = "Skriv her..."  onChange = {this.changeHandler}/> 
                  <br />       
                  <br />
                  <button className = "button2" type = "button" onClick={this.handleFormSubmit}> Logg inn </button>
                </div>
                </span>
            </div> 
          </div>
      );
    }
}