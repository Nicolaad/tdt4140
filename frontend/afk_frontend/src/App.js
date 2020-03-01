import React, { Component } from "react";
import "./App.css";
import NavBar from "./NavBar";

class App extends Component {
  constructor(props){
    super(props)
    this.state= {isAuthenticated: (!localStorage.getItem('token') === null),
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')}

    this.deAuthenticate = this.deAuthenticate.bind(this)
    this.authenticate = this.authenticate.bind(this)
  }

  deAuthenticate(){
    this.setState({isAuthenticated: false, username: null, token: null},)
    localStorage.clear()
  }

  authenticate(){
    this.setState({isAuthenticated: true,
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token')})
  }
  render() {
    return (


      <div className="App">
        {this.state.isAuthenticated ? 
        <div>
          <h1>Hei {this.state.username}</h1>
          <NavBar isAuthenticated={true} authenticateFunction={()=> this.deAuthenticate()}></NavBar>
        </div>
        :
        <div>
        <h1>vennligst logg inn</h1>
        <NavBar isAuthenticated={false} authenticateFunction={()=> this.authenticate()}></NavBar>
        </div>
        }
      </div>
    );
  }
}

export default App;
