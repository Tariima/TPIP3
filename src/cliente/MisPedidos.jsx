import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listarMisPedidos } from '../services/api';

const MisPedidos = () => {
  const { numero } = useParams();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await listarMisPedidos();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      }
    };
    cargar();
  }, []);

  // 1. Obtenemos los IDs únicos de esta mesa y los ordenamos de menor a mayor
  const cuentasIds = [...new Set(pedidos.map(p => p.cuentaId))]
    .filter(id => id !== null)
    .sort((a, b) => a - b);

  // 2. Agrupamos los pedidos por cuenta
  const resumen = pedidos.reduce((acc, p) => {
    // Averiguamos qué posición visual le toca a este ID (le sumamos 1 porque los arrays empiezan en 0)
    const numeroVisual = cuentasIds.indexOf(p.cuentaId) + 1;
    
    // Armamos el nombre: Si la BD manda un nombre real lo usamos, sino usamos nuestro número visual
    const nombre = p.Cuenta?.nombre || (p.cuentaId ? `Cuenta ${numeroVisual}` : "Cuenta sin nombre"); 
    
    if (!acc[nombre]) {
      acc[nombre] = { total: 0, items: [] };
    }
    acc[nombre].total += Number(p.total);
    acc[nombre].items.push(p);
    return acc;
  }, {});

  const totalMesa = pedidos.reduce((acc, ped) => acc + Number(ped.total), 0);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Mesa {numero} - Mis Pedidos</h2>

      {/* DETALLE POR CUENTA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        {Object.entries(resumen)
          .sort(([nombreA], [nombreB]) => nombreA.localeCompare(nombreB))
          .map(([nombreCuenta, datos]) => (
          <div key={nombreCuenta} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              {nombreCuenta} (Gasto: ${datos.total.toFixed(2)})
            </h3>
            {datos.items.map((pedido, index) => (
              <div key={pedido.id} style={{ marginBottom: '10px',paddingBottom: '10px',borderBottom: index !== datos.items.length - 1 ? '1px dashed #eee' : 'none' }}>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {pedido.PedidoItems.map(item => (
                    <li key={item.id}>{item.cantidad}x {item.nombreProducto}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* TOTAL Mesa */}
      <div style={{ background: '#4f46e5', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.8em' }}>TOTAL DE LA MESA</p>
        <h2 style={{ margin: 0 }}>${totalMesa.toFixed(2)}</h2>
      </div>

    </div>
  );
};

export default MisPedidos;