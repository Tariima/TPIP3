import React, { useEffect, useState } from 'react';
import { listarMesas, guardarMesa, regenerarPin, eliminarMesa, abrirMesa, cerrarMesa } from './table.services';

const MesasAdmin = () => {
  const [mesas, setMesas] = useState([]);
  const [error, setError] = useState('');
  const [mesaEditando, setMesaEditando] = useState(null);

  // URL dinámica hacia donde debe apuntar el QR (Vista Cliente)
  const baseUrl = window.location.origin;

  const cargarDatos = async () => {
    try {
      const data = await listarMesas();
      setMesas(data.sort((a, b) => a.numero - b.numero));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await guardarMesa(mesaEditando);
      setMesaEditando(null);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Confirmás que querés eliminar esta mesa del sistema?')) return;
    try {
      await eliminarMesa(id);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegenerarPin = async (mesa) => {
    if (!window.confirm(`¿Regenerar el PIN de la mesa #${mesa.numero}? Esto invalidará el acceso del cliente actual.`)) return;
    try {
      await regenerarPin(mesa);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAbrir = async (id) => {
    try {
      await abrirMesa(id);
      cargarDatos(); // Recarga para ver el nuevo PIN y estado
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCerrar = async (id) => {
    if (!window.confirm('¿Seguro que querés cerrar la mesa? Esto bloqueará nuevos pedidos.')) return;
    try {
      await cerrarMesa(id);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Gestión de Mesas y Códigos QR</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* LISTADO DE MESAS */}
        <div style={{ flex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3>Plano del Salón</h3>
            <button 
              onClick={() => setMesaEditando({ numero: '' })}
              style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              + Agregar Mesa
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '10px' }}>Mesa</th>
                <th style={{ padding: '10px' }}>Estado</th>
                <th style={{ padding: '10px' }}>PIN Cliente</th>
                <th style={{ padding: '10px' }}>QR</th>
                <th style={{ padding: '10px' }}>Acciones</th>
                <th style={{ padding: '10px' }}>Control de Sesión</th>
              </tr>
            </thead>
            <tbody>
              {mesas.map((m) => {
                const qrUrl = `${baseUrl}/${m.numero}`;
                const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`;
                return (
                  <tr key={m.id} style={{ borderBottom: '1px solid #eee', opacity: m.activa ? 1 : 0.5 }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', fontSize: '1.2em' }}>#{m.numero}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.9em',
                        backgroundColor: m.estado === 'disponible' ? '#d1fae5' : '#fee2e2',
                        color: m.estado === 'disponible' ? '#065f46' : '#991b1b'
                      }}>
                        {m.estado.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '1.2em', letterSpacing: '2px' }}>{m.pin}</span>
                        <button
                          type="button"
                          onClick={() => handleRegenerarPin(m)}
                          title="Generar un PIN nuevo e invalidar el acceso actual"
                          style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8em' }}>
                          🔄 Nuevo PIN
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(qrUrl)}`}
                          alt={`QR Mesa ${m.numero}`}
                        />
                        <button
                          type="button"
                          onClick={() => window.open(qrImgUrl, '_blank', 'noopener')}
                          title="Abrir el código QR en grande para mostrarlo o imprimirlo"
                          style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8em', width: '100%' }}>
                          Abrir QR
                        </button>
                        <button
                          type="button"
                          onClick={() => window.open(qrUrl, '_blank', 'noopener')}
                          title="Entrar a la mesa como cliente (pantalla de PIN)"
                          style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8em', width: '100%' }}>
                          Ir a mesa
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '10px' }}>
                        {m.estado === 'disponible' ? (
                        <button 
                        onClick={() => handleAbrir(m.id)}
                        style={{ backgroundColor: '#10b981', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        🟢 Abrir Mesa
                        </button>
                    ) : (
                        <button 
                        onClick={() => handleCerrar(m.id)}
                        style={{ backgroundColor: '#f43f5e', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        🔴 Cerrar Mesa
                        </button>
                    )}
                    </td>

                    <td style={{ padding: '10px', display: 'flex', gap: '5px', flexDirection: 'column' }}>
                      <button onClick={() => setMesaEditando({ ...m })} style={{ cursor: 'pointer' }}>Editar</button>
                      <button onClick={() => handleEliminar(m.id)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>Borrar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FORMULARIO LATERAL */}
        {mesaEditando && (
          <div style={{ flex: 1, padding: '15px', border: '1px solid #4f46e5', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
            <h4>{mesaEditando.id ? `Editar Mesa #${mesaEditando.numero}` : 'Nueva Mesa'}</h4>
            <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <label style={{fontWeight: 'bold'}}>Número de Mesa:</label>
              <input type="number" value={mesaEditando.numero} onChange={(e) => setMesaEditando({...mesaEditando, numero: e.target.value})} required disabled={!!mesaEditando.id} style={{padding: '5px'}}/>
              
              {mesaEditando.id && (
                <>
                  <label style={{fontWeight: 'bold', marginTop: '10px'}}>Estado actual:</label>
                  <select value={mesaEditando.estado} onChange={(e) => setMesaEditando({...mesaEditando, estado: e.target.value})} style={{padding: '5px'}}>
                    <option value="disponible">Disponible (Libre)</option>
                    <option value="ocupada">Ocupada</option>
                  </select>

                  <label style={{ display: 'flex', gap: '5px', marginTop: '15px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={mesaEditando.activa} onChange={(e) => setMesaEditando({...mesaEditando, activa: e.target.checked})} />
                    Mesa Activa (Habilitada en salón)
                  </label>
                </>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="submit" style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '8px', flex: 1, cursor: 'pointer', borderRadius: '4px' }}>Guardar</button>
                <button type="button" onClick={() => setMesaEditando(null)} style={{ padding: '8px', flex: 1, cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesasAdmin;