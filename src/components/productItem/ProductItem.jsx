// tarjeta de un producto con su boton para agregarlo al carrito
import React, { useState } from "react";
import "./ProductItem.css";
import { agregarAlCarrito } from "../../services/cart/cart.services";
import QuantityModal from "../common/QuantityModal";
import { toast } from "react-toastify";

function ProductItem({ product, accountId }) {
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  // confirma la cantidad elegida en el modal y lo manda al carrito
  const handleConfirmQuantity = async (cantidad) => {
    try {
      await agregarAlCarrito(accountId, product.id, cantidad);
      toast.success(`${product.nombre} agregado al carrito.`);
      setShowModal(false);
    } catch (error) {
      toast.error("Hubo un error al agregar el producto.");
      console.error(error);
    }
  };

  return (
    <>
      <article className="product-card">
        <div className="product-image-wrapper">
          {/* si el producto tiene imagen la muestro, sino dejo un placeholder */}
          {product.imagen ? (
            <img
              className="product-image"
              src={product.imagen}
              alt={product.nombre}
            />
          ) : (
            <div className="product-image-placeholder"></div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.nombre}</h3>

          {product.descripcion && (
            <p className="product-description">{product.descripcion}</p>
          )}

          <div className="product-footer">
            <span className="product-price">${product.precio}</span>
            <button className="product-button" onClick={handleAddClick}>
              Agregar
            </button>
          </div>
        </div>
      </article>

      <QuantityModal 
        show={showModal} 
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmQuantity}
        productName={product.nombre}
      />
    </>
  );
}

export default ProductItem;
