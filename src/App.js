import React, { useEffect, useState } from 'react';
import './App.css';
import { obtenerPruebaBackend } from './services/api';

function App() {
  const [estadoBackend, setEstadoBackend] = useState('Conectando con el backend...');

  useEffect(() => {
    obtenerPruebaBackend()
      .then((data) => setEstadoBackend(data.mensaje))
      .catch(() => setEstadoBackend('No se pudo conectar con el backend'));
  }, []);

  const productos = [
    { nombre: 'Hamburguesa clasica', precio: '$ 8.500' },
    { nombre: 'Papas con cheddar', precio: '$ 4.200' },
    { nombre: 'Cerveza artesanal', precio: '$ 3.800' }
  ];

  return (
    <div className="App">
      <header className="topbar">
        <div>
          <span className="brand-kicker">Gestion de bar</span>
          <h1>Mesa QR</h1>
        </div>
        <span className="connection-status">{estadoBackend}</span>
      </header>

      <main className="layout">
        <section className="intro-panel">
          <div className="intro-copy">
            <span className="table-badge">Mesa 12</span>
            <h2>Pedidos desde la mesa, con control del mozo</h2>
            <p>
              El cliente escanea el QR, ingresa el PIN que le da el mozo y arma
              su pedido desde el menu del bar.
            </p>
          </div>

          <div className="qr-card" aria-label="Codigo QR de ejemplo">
            <div className="qr-grid">
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
            </div>
            <p>QR Mesa 12</p>
          </div>
        </section>

        <section className="content-grid">
          <article className="phone-preview">
            <div className="phone-header">
              <span>Bar Central</span>
              <strong>Mesa 12</strong>
            </div>

            <div className="pin-box">
              <label htmlFor="pin">PIN de acceso</label>
              <div className="pin-input" id="pin">4 8 2 1</div>
            </div>

            <div className="menu-list">
              <h3>Menu disponible</h3>
              {productos.map((producto) => (
                <div className="product-row" key={producto.nombre}>
                  <div>
                    <strong>{producto.nombre}</strong>
                    <span>Disponible ahora</span>
                  </div>
                  <button type="button">Agregar</button>
                  <b>{producto.precio}</b>
                </div>
              ))}
            </div>
          </article>

          <aside className="order-panel">
            <div>
              <span className="panel-label">Pedido actual</span>
              <h3>Resumen de la mesa</h3>
            </div>

            <div className="order-type">
              <button type="button" className="active">En conjunto</button>
              <button type="button">Por separado</button>
            </div>

            <div className="ticket">
              <div>
                <span>2x Hamburguesa clasica</span>
                <strong>$ 17.000</strong>
              </div>
              <div>
                <span>1x Papas con cheddar</span>
                <strong>$ 4.200</strong>
              </div>
              <div>
                <span>3x Cerveza artesanal</span>
                <strong>$ 11.400</strong>
              </div>
            </div>

            <button type="button" className="confirm-button">Confirmar pedido</button>
          </aside>

          <aside className="waiter-panel">
            <div>
              <span className="panel-label">Vista del mozo</span>
              <h3>Pedidos entrantes</h3>
            </div>

            <div className="waiter-order">
              <span>Mesa 12</span>
              <strong>Pedido en conjunto</strong>
              <p>6 productos cargados por el cliente.</p>
            </div>

            <div className="waiter-order muted">
              <span>Mesa 7</span>
              <strong>Pedido separado</strong>
              <p>Esperando confirmacion.</p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
