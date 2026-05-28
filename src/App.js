import React, { useEffect, useState } from 'react';
import './App.css';
import { obtenerPruebaBackend } from './services/api';
import { AuthProvider } from './AuthContext.js';
import Login from './Login.jsx';

function App() {
  const [estadoBackend, setEstadoBackend] = useState('Conectando con el backend...');

  useEffect(() => {
    obtenerPruebaBackend()
      .then((data) => setEstadoBackend(data.mensaje))
      .catch(() => setEstadoBackend('No se pudo conectar con el backend'));
  }, []);

  return (
  <AuthProvider>
    <div className="App">
      <header className="App-header">
        <h1>TPIP3</h1>
        <p>Estructura base con React, Node y Express.</p>
      </header>

      <main className="App-main">
        <section>
          <h2>Frontend</h2>
          <p>Aplicacion React lista para comenzar a desarrollar.</p>
        </section>

        <section>
          <Login/>
        </section>

        <section>
          <h2>Backend</h2>
          <p>{estadoBackend}</p>
        </section>
      </main>

      <footer className="App-footer">
        <p>Programacion 3 - TUP</p>
      </footer>
    </div>
  </AuthProvider>
  );
}

export default App;
