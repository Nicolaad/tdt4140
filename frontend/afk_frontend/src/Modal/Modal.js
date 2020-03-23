import React, { Component } from 'react';
import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';

import CommentManager from '../Thread/CommentManager'
export class Modal extends Component {
  constructor() {
    super();
    this.state = {
      isShown: false
    };
  }
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };
  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = event => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };
  render() {

    var modalContent;
    var bigView = false
    //append new things to the modal content here
    if(this.props.modalProps.isFullThread){
      modalContent= <div>{this.props.modalContent} 
        <CommentManager id={this.props.modalProps.id} isAuthenticated = {this.props.modalProps.isAuthenticated}/>
        </div>
      bigView = true;
    }else{
      modalContent = this.props.modalContent;
    }
     
    return (
      <React.Fragment>
        <ModalTrigger
          showModal={this.showModal}
          buttonRef={n => (this.TriggerButton = n)}
          triggerText={this.props.modalProps.triggerText}
          isFullThread={this.props.modalProps.isFullThread}
        />
        {this.state.isShown ? (
          <ModalContent
            modalRef={n => (this.modal = n)}
            buttonRef={n => (this.closeButton = n)}
            closeModal={this.closeModal}
            content={modalContent}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
            bigView={bigView}
          />
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
