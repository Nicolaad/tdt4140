import React, { Component } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Body from "./Body";

class App extends Component {
  constructor(props){
    super(props)
    this.state= {isAuthenticated: (sessionStorage.getItem('token')!== null),
    token: sessionStorage.getItem('token'),
    username: sessionStorage.getItem('username')}

    this.deAuthenticate = this.deAuthenticate.bind(this)
    this.authenticate = this.authenticate.bind(this)
    
  }


  deAuthenticate = (e) =>{
    this.setState({isAuthenticated: false, username: null, token: null},)
    sessionStorage.clear()
  }

  authenticate = () =>{
    this.setState({isAuthenticated: true,
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token')})
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
          <Body 
          username={this.state.username}
          isAuthenticated={this.state.isAuthenticated} />
        
      </div>
    );
  }
}

export default App;
