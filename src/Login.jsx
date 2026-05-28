import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Ajustá la ruta según donde lo guardes

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Traemos la función 'login' desde nuestro Contexto
  const { user, login, logout} = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // simulacion de back
    const tokenSimulado = "este_es_un_token_falso_12345";
    const usuarioSimulado = { email: email, rol: "mozo" };
    
    // Ejecutamos la función de nuestro Contexto para guardar estos datos falsos
    login(tokenSimulado, usuarioSimulado);
    alert('¡Login simulado con éxito en el Frontend!');
    // try {
    //   // Hacemos la petición a la ruta de tu backend en Express
    //   const response = await fetch('http://localhost:3001/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     // ¡Éxito! Usamos la función del contexto para guardar el token
    //     login(data.token, data.usuario);
    //     alert('¡Login exitoso!');
    //     // Acá normalmente usarías react-router-dom para redirigir a la vista de mesas/pedidos
    //   } else {
    //     alert(data.mensaje || 'Error al iniciar sesión');
    //   }
    // } catch (error) {
    //   console.error('Error en la conexión con el servidor:', error);
    // }
  };
  // --- RENDERIZADO CONDICIONAL ---
  // Si 'user' tiene datos, significa que ya inició sesión, mostramos un panel de control simple.
  if (user) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#e8f5e9', border: '1px solid #4caf50', borderRadius: '8px', marginTop: '20px' }}>
        <h3>¡Sesión Iniciada!</h3>
        <p>Bienvenido al sistema del bar.</p>
        <p>Usuario activo: <strong>{user.email}</strong></p>
        <p>Rol: <strong>{user.rol}</strong></p>
        {/* Al hacer clic, ejecuta la función logout del Contexto, borrando todo */}
        <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Ingreso al Sistema</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;