import React, { useState } from 'react';
import { crearNuevoUsuario } from './registro.services';
// import './Registro.css'; <-- Podés crear este archivo después para darle estilos

const Registro = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    rolId: 2 // Por defecto: mozo
  });

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: '', tipo: '' });

    formData.rolId = parseInt(formData.rolId, 10);

    try {
      // Llamamos a la función limpia que importamos del servicio
      await crearNuevoUsuario(formData);
      
      setMensaje({ texto: 'Usuario creado con éxito', tipo: 'exito' });
      setFormData({ nombreCompleto: '', email: '', password: '', rolId: 2 });

    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registrar Nuevo Empleado</h2>
      
      {mensaje.texto && (
        <div style={{ color: mensaje.tipo === 'error' ? 'red' : 'green', marginBottom: '15px' }}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nombre Completo:</label><br />
          <input 
            type="text" name="nombreCompleto" value={formData.nombreCompleto} 
            onChange={handleChange} required style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" name="email" value={formData.email} 
            onChange={handleChange} required style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Contraseña temporal:</label><br />
          <input 
            type="password" name="password" value={formData.password} 
            onChange={handleChange} required style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Rol del sistema:</label><br />
          <select name="rolId" value={formData.rolId} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value={1}>Administrador</option>
            <option value={2}>Mozo</option>
            <option value={3}>Cocina</option>
          </select>
        </div>
        <button type="submit" disabled={cargando} style={{ padding: '10px', backgroundColor: '#4f46e5', color: 'white', cursor: 'pointer' }}>
          {cargando ? 'Guardando...' : 'Crear Usuario'}
        </button>
      </form>
    </div>
  );
};

export default Registro;