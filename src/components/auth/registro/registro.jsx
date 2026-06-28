import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearNuevoUsuario } from './registro.services';
import { obtenerRoles } from '../../admin/admin.services';
import { validarUsuario } from '../../admin/usuarios.validations';
import { AuthContext } from '../../../services/auth/auth.context';
import '../../admin/AdminLayout.css';

const Registro = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    rolId: '',
  });

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);
  const [roles, setRoles] = useState([]);

  // Traemos del backend solo los roles asignables al personal (sin 'cliente').
  useEffect(() => {
    obtenerRoles()
      .then(setRoles)
      .catch((error) => setMensaje({ texto: error.message, tipo: 'error' }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    // Validacion en el formulario antes de llamar al backend.
    const validacion = validarUsuario(formData);
    if (validacion.error) {
      setMensaje({ texto: validacion.mensaje, tipo: 'error' });
      return;
    }

    setCargando(true);

    formData.rolId = parseInt(formData.rolId, 10);

    try {
      // Llamamos a la función limpia que importamos del servicio
      await crearNuevoUsuario(formData, token);
      
      setMensaje({ texto: 'Usuario creado con éxito', tipo: 'exito' });
      setFormData({ nombreCompleto: '', email: '', password: '', rolId: '' });

    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="admin-page admin-page-narrow">
      <div className="admin-card" style={{ maxWidth: '420px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/admin/usuarios')}
        className="admin-button admin-button-secondary"
        style={{ marginBottom: '15px' }}
      >
        ← Volver a usuarios
      </button>
      <h2>Registrar Nuevo Empleado</h2>
      
      {mensaje.texto && (
        <div className={`admin-message ${mensaje.tipo === 'error' ? 'admin-message-error' : 'admin-message-success'}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
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
          <select name="rolId" value={formData.rolId} onChange={handleChange} required style={{ width: '100%', padding: '8px', textTransform: 'capitalize' }}>
            <option value="">Seleccioná un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={cargando} className="admin-button admin-button-primary">
          {cargando ? 'Guardando...' : 'Crear Usuario'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Registro;
