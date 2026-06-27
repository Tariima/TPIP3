import React, { useEffect, useState } from 'react';
import { listarMesas, guardarMesa, regenerarPin, eliminarMesa, abrirMesa, cerrarMesa } from './table.services';
import { validarMesa } from './mesas.validations';
import './AdminLayout.css';

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
    setError('');

    // Validacion en el formulario antes de llamar al backend.
    const validacion = validarMesa(mesaEditando);
    if (validacion.error) {
      setError(validacion.mensaje);
      return;
    }

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
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h2 className="admin-title">Gestion de mesas</h2>
          <p className="admin-subtitle">Administra mesas, PIN de acceso y codigos QR.</p>
        </div>
      </header>

      {error && <div className="admin-message admin-message-error">{error}</div>}

      <div className={`admin-layout ${mesaEditando ? '' : 'admin-layout-single'}`}>
        
        {/* LISTADO DE MESAS */}
        <div className="admin-card">
          <div className="admin-section-header">
            <h3>Plano del Salón</h3>
            <button 
              onClick={() => setMesaEditando({ numero: '' })}
              className="admin-button admin-button-primary">
              Agregar mesa
            </button>
          </div>
          <div className="admin-table-wrapper">
          <table className="admin-table admin-table-compact">
            <thead>
              <tr>
                <th>Mesa</th>
                <th>Estado</th>
                <th>PIN cliente</th>
                <th>QR</th>
                <th>Sesion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mesas.map((m) => {
                const qrUrl = `${baseUrl}/${m.numero}`;
                const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`;
                return (
                  <tr key={m.id} style={{ opacity: m.activa ? 1 : 0.5 }}>
                    <td><strong>#{m.numero}</strong></td>
                    <td>
                      <span className={`admin-badge ${m.estado === 'disponible' ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                        {m.estado.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions admin-actions-column">
                        <span className="admin-pin">{m.pin}</span>
                        <button
                          type="button"
                          onClick={() => handleRegenerarPin(m)}
                          title="Generar un PIN nuevo e invalidar el acceso actual"
                          className="admin-button admin-button-warning">
                          Nuevo PIN
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="admin-qr-cell">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(qrUrl)}`}
                          alt={`QR Mesa ${m.numero}`}
                        />
                        <button
                          type="button"
                          onClick={() => window.open(qrImgUrl, '_blank', 'noopener')}
                          title="Abrir el código QR en grande para mostrarlo o imprimirlo"
                          className="admin-button admin-button-primary">
                          Abrir QR
                        </button>
                        <button
                          type="button"
                          onClick={() => window.open(qrUrl, '_blank', 'noopener')}
                          title="Entrar a la mesa como cliente (pantalla de PIN)"
                          className="admin-button admin-button-secondary">
                          Ir a mesa
                        </button>
                      </div>
                    </td>
                    <td>
                        {m.estado === 'disponible' ? (
                        <div className="admin-actions admin-actions-column">
                          <button 
                          onClick={() => handleAbrir(m.id)}
                          className="admin-button admin-button-success">
                          Abrir mesa
                          </button>
                        </div>
                    ) : (
                        <div className="admin-actions admin-actions-column">
                          <button 
                          onClick={() => handleCerrar(m.id)}
                          className="admin-button admin-button-danger">
                          Cerrar mesa
                          </button>
                        </div>
                    )}
                    </td>

                    <td>
                      <div className="admin-actions admin-actions-column">
                        <button onClick={() => setMesaEditando({ ...m })} className="admin-button admin-button-secondary">Editar</button>
                        <button onClick={() => handleEliminar(m.id)} className="admin-button admin-button-danger">Borrar</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>

        {/* FORMULARIO LATERAL */}
        {mesaEditando && (
          <div className="admin-card">
            <h4>{mesaEditando.id ? `Editar Mesa #${mesaEditando.numero}` : 'Nueva Mesa'}</h4>
            <form onSubmit={handleGuardar} className="admin-form">
              
              <label>Número de Mesa:</label>
              <input type="number" value={mesaEditando.numero} onChange={(e) => setMesaEditando({...mesaEditando, numero: e.target.value})} required disabled={!!mesaEditando.id} />
              
              {mesaEditando.id && (
                <>
                  <label>Estado actual:</label>
                  <select value={mesaEditando.estado} onChange={(e) => setMesaEditando({...mesaEditando, estado: e.target.value})}>
                    <option value="disponible">Disponible (Libre)</option>
                    <option value="ocupada">Ocupada</option>
                  </select>

                  <label style={{ display: 'flex', gap: '5px', marginTop: '15px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={mesaEditando.activa} onChange={(e) => setMesaEditando({...mesaEditando, activa: e.target.checked})} />
                    Mesa Activa (Habilitada en salón)
                  </label>
                </>
              )}

              <div className="admin-form-row">
                <button type="submit" className="admin-button admin-button-primary">Guardar</button>
                <button type="button" onClick={() => setMesaEditando(null)} className="admin-button admin-button-secondary">Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesasAdmin;
