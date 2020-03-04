import React, { Component } from "react";
import Modal from "./Modal/Modal";
import PostForm from "./RegisterUser/PostForm";
import "./NavBar.css";
import Login from "./Login"
 
class NavBar extends Component {
  render() {
    return (
      <div className = "navBar">
        <img id = "logo" src = "AFK-logo side.png"/>
        <div className = "login">
          {this.props.isAuthenticated ? 
            <div className="leftbuttonsnav">
              <button className="button2" onClick={this.props.authenticateFunction} id="logout">Logg ut</button>
              <button className="button2" >{this.props.username}</button>
            </div>
              :
            <div className="leftbuttonsnav">
              <Modal modalProps={{triggerText: "Logg inn"}} modalContent={<Login authenticateFunction={this.props.authenticateFunction} /> } />
              <Modal modalProps={{triggerText: "Registrer bruker"}} modalContent={<PostForm />} />
            </div>
          }
        </div>
      </div> 
    );
  }
}
 
export default NavBar;

/*Eventuelt
Logo og navn på samme linje:
<img id = "logo" src = "AFK-logo side.png"/>
*/