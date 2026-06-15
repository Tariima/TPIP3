import React from "react";
import "./ProductItem.css";

function ProductItem({ product, accountId }) {
  const handleAddProduct = () => {
    console.log(`Agregar producto a la cuenta ${accountId}`, product);
  };
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={product.imagen}
          alt={product.nombre}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>

        {product.descripcion && (
          <p className="product-description">{product.descripcion}</p>
        )}

        <div className="product-footer">
          <span className="product-price">${product.precio}</span>
          <button className="product-button" onClick={handleAddProduct}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
