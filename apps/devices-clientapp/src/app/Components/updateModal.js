import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap'

export const UpdateModalComponent = ({deviceDetails, closeModal, show, onHide}) => {
//  console.log('deviceDetails', deviceDetails)
//  console.log('closeModal', closeModal)
    return (
        <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

     