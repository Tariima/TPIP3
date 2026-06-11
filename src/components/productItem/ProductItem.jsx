import React from "react";
import "./ProductItem.css";

function ProductItem({ product, accountId }) {
  const handleAddProduct = () => {
    console.log(`Agregar producto a la cuenta ${accountId}`, product);
  };
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}

        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button className="product-button" onClick={handleAddProduct}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
