import React, { Component } from "react";
import NavBar from "./NavBar/NavBar";
import ThreadManager from "./ThreadManager";

class App extends Component {
  constructor(props){
    super(props)
    localStorage.setItem("djangoUrl", this.props.djangoUrl)
    this.state= {isAuthenticated: (sessionStorage.getItem('token')!== null),
    token: sessionStorage.getItem('token'),
    username: sessionStorage.getItem('username')}

    this.deAuthenticate = this.deAuthenticate.bind(this)
    this.authenticate = this.authenticate.bind(this)
    
  }
  
  deAuthenticate(){
    this.setState({isAuthenticated: false, username: null, token: null},)
    sessionStorage.clear()
  }

  authenticate(){
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
              authenticateFunction={()=> this.deAuthenticate()}
            />
            
          </div>
          :
          <div>
            <NavBar isAuthenticated={false} authenticateFunction={()=> this.authenticate()}/>
          </div>
          }
          <ThreadManager 
            username={this.state.username}
            isAuthenticated={this.state.isAuthenticated}
          />
        
      </div>
    );
  }
}

export default App;
