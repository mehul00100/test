import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, onHide, onDelete, setRemark }) => {
  const handleDelete = () => {
    onDelete(); // Perform actual delete action
  };

  return (
    <Modal show={show} onHide={onHide} animation={true}>
      <form>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="textarea"
            required
            onChange={(e) => setRemark(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancle
          </Button>
          <Button variant="danger" type={"submit"} onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ConfirmationModal;
