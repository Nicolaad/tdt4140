import React, { Component } from "react";
import PostForm from "./RegisterUser/PostForm";
import "./App.css";
import Modal from "./Modal/Modal";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Modal modalProps={{triggerText: "Logg inn"}} modalContent={<PostForm />} />
        <Modal modalProps={{triggerText: "Register bruker"}} modalContent={<PostForm />} />
      </div>
    );
  }
}

export default App;
