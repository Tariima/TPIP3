// panel del admin para ver los pedidos de las mesas e ir cambiandoles el estado
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarPedidos, actualizarEstadoPedido, eliminarPedido, ESTADOS_PEDIDO } from './order.services';
import './AdminLayout.css';

// segun el estado del pedidio le pongo una clase distinta para pintar la tarjeta
const claseEstado = {
  'pendiente': 'admin-order-card-pendiente',
  'en preparacion': 'admin-order-card-preparacion',
  'listo': 'admin-order-card-listo',
  'entregado': 'admin-order-card-entregado',
  'cancelado': 'admin-order-card-cancelado',
};

const PedidosPanel = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  const cargarDatos = async () => {
    try {
      const data = await listarPedidos();
      setPedidos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  // al cambiar el estado en el select aviso al backend y recargo para ver el cambio
  const handleCambiarEstado = async (id, estado) => {
    try {
      await actualizarEstadoPedido(id, estado);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm(`¿Eliminar el pedido #${id}? Esta acción no se puede deshacer.`)) return;
    try {
      await eliminarPedido(id);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page admin-page-narrow">
      <header className="admin-header">
        <div>
          <h2 className="admin-title">Panel de pedidos</h2>
          <p className="admin-subtitle">Seguimiento de pedidos realizados por las mesas.</p>
        </div>
        <div className="admin-actions">
          <button
            onClick={() => navigate('/')}
            className="admin-button admin-button-secondary">
            ← Volver al inicio
          </button>
          <button
            onClick={cargarDatos}
            className="admin-button admin-button-primary">
            Actualizar
          </button>
        </div>
      </header>

      {error && <div className="admin-message admin-message-error">{error}</div>}

      {pedidos.length === 0 ? (
        <div className="admin-card">
          <p className="admin-muted">No hay pedidos por el momento.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className={`admin-order-card ${claseEstado[pedido.estado] || ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="admin-order-dot"></span>
                  <h3 style={{ margin: 0 }}>
                    Pedido #{pedido.id} - Mesa {pedido.mesa ?? '—'}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <select
                    value={pedido.estado}
                    onChange={(e) => handleCambiarEstado(pedido.id, e.target.value)}
                    style={{ padding: '6px', borderRadius: '4px', fontWeight: 'bold' }}>
                    {ESTADOS_PEDIDO.map((estado) => (
                      <option key={estado} value={estado}>{estado.toUpperCase()}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleEliminar(pedido.id)}
                    title="Eliminar pedido"
                    className="admin-button admin-button-danger">
                    Eliminar
                  </button>
                </div>
              </div>

              <ul style={{ margin: '0 0 10px', paddingLeft: '20px' }}>
                {pedido.items.map((item) => (
                  <li key={item.id}>
                    {item.cantidad} x {item.nombreProducto}
                    <span className="admin-muted"> (${item.subtotal})</span>
                  </li>
                ))}
              </ul>

              {/* la nota solo la muestro si el cliente cargo alguna */}
              {pedido.notas && (
                <p style={{ margin: '0 0 8px', fontStyle: 'italic' }}>
                  Nota: {pedido.notas}
                </p>
              )}

              <strong>Total: ${pedido.total}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidosPanel;
