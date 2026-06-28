// modal de confirmacion para asegurarse antes de borrar un producto del carrito
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteConfirmModal({ show, handleClose, handleConfirm, itemName }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que quieres eliminar <strong>{itemName}</strong> del carrito?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
