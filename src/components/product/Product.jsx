import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./product.css";

function Product() {
  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => {
    setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  let product = {
    image:
      "https://carrefourar.vtexassets.com/arquivos/ids/226775/7790290101602_02.jpg?v=637715449494370000",
    name: "Fernet",
    description: "El mejor fernete",
    price: 5000,
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

        <Button className="custom-btn">nashei</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
