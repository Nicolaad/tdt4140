import React, { Component } from "react";
import Modal from "../Modal/Modal";
import RegisterForm from "./RegisterForm";
import "../Styles/NavBar.css";
import LoginForm from "./LoginForm"
 
class NavBar extends Component {
  render() {
    return (
      <div className = "navBar">
        <img alt= "AFK forum logo" id = "logo" src = "AFK-logo side.png"/>
        <div className = "login">
          {this.props.isAuthenticated ? 
            <div className="leftbuttonsnav">
              <button className="button2" onClick={this.props.authenticateFunction} id="logout">Logg ut</button>
              <button className="button2" >{this.props.username}</button>
            </div>
              :
            <div className="leftbuttonsnav">
              <Modal modalProps={{triggerText: "Logg inn"}} modalContent={<LoginForm authenticateFunction={this.props.authenticateFunction} /> } />
              <Modal modalProps={{triggerText: "Registrer bruker"}} modalContent={<RegisterForm />} />
            </div>
          }
        </div>
      </div> 
    );
  }
}
 
export default NavBar;