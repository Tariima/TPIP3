// modal que pregunta cuantas unidades agregar antes de meter el producto al carrito
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function QuantityModal({ show, handleClose, handleConfirm, productName }) {
  const [quantity, setQuantity] = useState(1);

  // mando la cantidad elegida y reseteo a 1 para la proxima vez que se abra
  const onSubmit = (e) => {
    e.preventDefault();
    handleConfirm(quantity);
    setQuantity(1);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar {productName}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>¿Cuántas unidades quieres agregar?</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "var(--accent)", border: "none" }}
          >
            Agregar al carrito
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default QuantityModal;
