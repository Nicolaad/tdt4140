import React, { Component } from "react";
import Modal from "./Modal/Modal";
import PostForm from "./RegisterUser/PostForm";
import "./NavBar.css";
 
class NavBar extends Component {
  render() {
    return (
      <div className = "navBar">
        <div className = "login">
            <Modal modalProps={{triggerText: "Logg inn"}} modalContent={<PostForm />} />
            <Modal modalProps={{triggerText: "Register bruker"}} modalContent={<PostForm />} />
        </div>
      </div>
    );
  }
}
 
export default NavBar;