import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ValidarMesa = () => {
  const { numero } = useParams(); // Obtenemos el "1" o "2" desde la URL
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleValidar = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/mesas/numero/${numero}/validar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje);

      // Si el PIN es correcto, guardamos la sesión en el navegador (sessionStorage se borra al cerrar la pestaña)
      sessionStorage.setItem('mesa_activa', numero);
      sessionStorage.setItem('mesa_id', data.mesaId);
      
      // Redirigimos al cliente a la vista pública de los productos
      navigate(`/${numero}/cuentas`)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <h2>Mesa #{numero}</h2>
        <p style={{ color: '#4b5563', marginBottom: '20px' }}>Ingresá el PIN de 4 dígitos que te brindó el mozo para acceder al menú.</p>
        
        {error && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{error}</p>}
        
        <form onSubmit={handleValidar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            maxLength="4" 
            placeholder="Ej: 1234" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ padding: '15px', fontSize: '2em', textAlign: 'center', letterSpacing: '10px', borderRadius: '5px', border: '2px solid #ccc' }}
            required
          />
          <button type="submit" style={{ backgroundColor: '#4f46e5', color: 'white', padding: '15px', fontSize: '1.2em', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Ver Menú
          </button>
        </form>
      </div>
    </div>
  );
};

export default ValidarMesa;