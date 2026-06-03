import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./ProductItem.css";

function ProductItem({ product }) {
  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => {
    setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <Card className="product-card mx-auto" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />

      <Card.Body className="text-center">
        <Card.Title>{product.name}</Card.Title>

        <Card.Text>{product.description}</Card.Text>

        <h5>${product.price}</h5>

        <div className="contador-container">
          <button className="contador-btn" onClick={decrementar}>
            -
          </button>

          <span className="contador-cantidad">{cantidad}</span>

          <button className="contador-btn" onClick={incrementar}>
            +
          </button>
        </div>

        <Button className="custom-btn mt-3">Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
