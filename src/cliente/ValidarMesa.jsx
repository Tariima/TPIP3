// pantalla donde el cliente carga el pin de la mesa para entrar al menu
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MesaContext } from '../services/mesa/mesa.context';
import { validarPin } from '../components/admin/mesas.validations';
import './ValidarMesa.css';

const ValidarMesa = () => {
  const { numero } = useParams(); // obtenemos numero desde la url
  const navigate = useNavigate();
  const { iniciarSesionMesa } = useContext(MesaContext);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleValidar = async (e) => {
    e.preventDefault();
    setError('');

    // validacion del pin antes de llamar al backend.
    const validacion = validarPin(pin);
    if (validacion.error) {
      setError(validacion.mensaje);
      return;
    }

    try {
      // si no hay variable de entorno uso localhost para probar en local
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/mesas/numero/${numero}/validar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje);

      // si el pin es correcto, se inicia la sesion global de mesa (token incluido).
      iniciarSesionMesa({
        mesaToken: data.mesaToken,
        mesaId: data.mesaId,
        numero,
      });

      // redirige al cliente al panel de cuentas de esa mesa.
      navigate(`/${numero}/cuentas`)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="validar-mesa-page">
      <div className="validar-mesa-card">
        <h2>Mesa #{numero}</h2>
        <p>Ingresá el PIN de 4 dígitos que te brindó el mozo para acceder al menú.</p>
        
        {error && <p className="validar-mesa-error">{error}</p>}
        
        <form onSubmit={handleValidar} className="validar-mesa-form">
          <input 
            type="text" 
            maxLength="4" 
            placeholder="Ej: 1234" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
          <button type="submit">
            Ver Menú
          </button>
        </form>
      </div>
    </div>
  );
};

export default ValidarMesa;
