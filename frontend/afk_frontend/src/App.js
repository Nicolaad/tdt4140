import React, { Component } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Body from "./Body";

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
            <NavBar 
            username={this.state.username} 
            isAuthenticated={true} 
            authenticateFunction={()=> this.deAuthenticate()}></NavBar>
          </div>
          :
          <div>
            <NavBar isAuthenticated={false} authenticateFunction={()=> this.authenticate()}></NavBar>
            
          </div>
          }
          <Body isAuthenticated={this.state.isAuthenticated} />
        
      </div>
    );
  }
}

export default App;
