import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const CentraliseModal = (props) => {
    const {show, handleClose, modalTitle, children, centered, size, LeftBtnValue, RightBtnValue, Rightbtn, handleSave, boldContent} = props;
  return (
    <>
    <Modal 
      show={show} 
      onHide= {handleClose}
      centered = {centered}
      size = {size}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTitle}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children && children}
          {boldContent && <strong>{boldContent}</strong>}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
          onClick={handleClose}>
            {LeftBtnValue}
          </Button>
          {Rightbtn && <Button variant="primary" 
          onClick={handleSave}>
            {RightBtnValue}
          </Button>}
        </Modal.Footer>
      </Modal>
    </>
  )
}
