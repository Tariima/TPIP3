import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerCarrito, actualizarCantidad, eliminarDelCarrito, confirmarPedido } from "../../services/cart/cart.services";
import { sesionMesaValida } from "../../services/mesa/mesa.session";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import { toast } from "react-toastify";
import "./Cart.css";

function Cart() {
  const { mesaId, accountId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [notas, setNotas] = useState("");
  const [enviando, setEnviando] = useState(false);

  const cargarCarrito = async () => {
    try {
      const data = await obtenerCarrito(accountId);
      setItems(data);
    } catch (error) {
      console.error(error);
      // Si se perdio la sesion de mesa (token rechazado), volvemos al PIN.
      if (!sesionMesaValida()) navigate(`/${mesaId}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, [accountId]);

  const handleUpdateQuantity = async (itemId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      const item = items.find(i => i.id === itemId);
      setItemToDelete(item);
      setShowDeleteModal(true);
      return;
    }
    try {
      await actualizarCantidad(accountId, itemId, newQty);
      cargarCarrito();
    } catch (error) {
      toast.error("Error al actualizar la cantidad");
    }
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarDelCarrito(accountId, itemToDelete.id);
      setShowDeleteModal(false);
      setItemToDelete(null);
      toast.info("Producto eliminado del carrito");
      cargarCarrito();
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  const handleConfirmarPedido = async () => {
    setEnviando(true);
    try {
      await confirmarPedido(accountId, notas);
      setNotas("");
      toast.success("¡Pedido confirmado! Ya lo recibió el personal.");
      cargarCarrito();
    } catch (error) {
      toast.error("Error al confirmar el pedido");
    } finally {
      setEnviando(false);
    }
  };

  const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

  if (loading) return <div className="cart-container">Cargando carrito...</div>;

  return (
    <div className="cart-container">
      <header className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h2>Mi Carrito</h2>
      </header>

      {items.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.Producto.nombre}</h4>
                <p>${item.precioUnitario} c/u</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => handleUpdateQuantity(item.id, item.cantidad, -1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.cantidad, 1)}>+</button>
                </div>
                <p className="subtotal">${item.subtotal}</p>
                <button className="delete-button" onClick={() => openDeleteModal(item)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <footer className="cart-footer">
          <textarea
            className="cart-notas"
            placeholder="Comentarios para la cocina (opcional)"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
          <div className="total-section">
            <span>Total:</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>
          <button className="checkout-button" onClick={handleConfirmarPedido} disabled={enviando}>
            {enviando ? "Enviando..." : "Confirmar Pedido"}
          </button>
        </footer>
      )}

      <DeleteConfirmModal 
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
        itemName={itemToDelete?.Producto?.nombre}
      />
    </div>
  );
}

export default Cart;
