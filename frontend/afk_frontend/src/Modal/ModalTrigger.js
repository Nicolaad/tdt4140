import React, { Component } from 'react';
import "./Modal.css"
class ModalTrigger extends Component {
  render() {
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
