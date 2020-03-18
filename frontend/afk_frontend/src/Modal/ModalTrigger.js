import React, { Component } from 'react';
import "./Modal.css"
class ModalTrigger extends Component {
  render() {
    //make element with isNotButton=true if you want a non button trigger.
    //omitt isNotButton, or specify it false to keep it as normal
    
    if (this.props.isNotButton){
    return (
      <div
        ref={this.props.buttonRef}
        onClick={this.props.showModal}
      >
      </div>
    );
  }else{
    return (
      <button
        ref={this.props.buttonRef}
        onClick={this.props.showModal}
        className="modal-button"
      >
        {this.props.triggerText}
      </button>
      
    );
    }
  }
}

export default ModalTrigger;
