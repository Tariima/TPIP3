import React, { useEffect, useState } from 'react';
import { listarPedidos, actualizarEstadoPedido, eliminarPedido, ESTADOS_PEDIDO } from './order.services';

// Color de fondo segun el estado, para que el personal ubique los pedidos de un vistazo.
const colorEstado = {
  'pendiente': '#fee2e2',
  'en preparacion': '#fef9c3',
  'listo': '#dbeafe',
  'entregado': '#d1fae5',
  'cancelado': '#e5e7eb',
};

const PedidosPanel = () => {
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
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Panel de Pedidos</h2>
        <button
          onClick={cargarDatos}
          style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
          🔄 Actualizar
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {pedidos.length === 0 ? (
        <p>No hay pedidos por el momento.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: colorEstado[pedido.estado] || '#fff',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0 }}>
                  Pedido #{pedido.id} - Mesa {pedido.mesa ?? '—'}
                </h3>
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
                    style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>

              <ul style={{ margin: '0 0 10px', paddingLeft: '20px' }}>
                {pedido.items.map((item) => (
                  <li key={item.id}>
                    {item.cantidad} x {item.nombreProducto}
                    <span style={{ color: '#555' }}> (${item.subtotal})</span>
                  </li>
                ))}
              </ul>

              {pedido.notas && (
                <p style={{ margin: '0 0 8px', fontStyle: 'italic' }}>
                  💬 {pedido.notas}
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
