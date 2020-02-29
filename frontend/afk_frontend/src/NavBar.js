import React, { Component } from "react";
import Modal from "./Modal/Modal";
import PostForm from "./RegisterUser/PostForm";
import "./NavBar.css";
import Login from "./Login"
 
class NavBar extends Component {
  render() {
    return (
      <div className = "navBar">
        <div className = "login">
          {this.props.isAuthenticated ? 
              <button onClick={this.props.authenticateFunction}>Logg ut</button>
              :
              <Modal modalProps={{triggerText: "Logg inn"}} modalContent={<Login authenticateFunction={this.props.authenticateFunction} /> } />}
            <Modal modalProps={{triggerText: "Register bruker"}} modalContent={<PostForm />} />
        </div>
      </div>
    );
  }
}
 
export default NavBar;