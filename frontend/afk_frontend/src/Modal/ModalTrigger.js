import React, { Component } from 'react';
import "./Modal.css"
class ModalTrigger extends Component {
  render() {
    //make element with isFullThread=true if modal is a expandable thread
    //omitt isFullThread, or specify it false to keep it as normal
    
    if (this.props.isFullThread){
    return (
      <div
        ref={this.props.buttonRef}
        onClick={this.props.showModal}
      >
        {this.props.triggerText}
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
