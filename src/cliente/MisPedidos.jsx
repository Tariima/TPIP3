import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listarMisPedidos, obtenerMesaPorNumero, obtenerCuentasMesa } from '../services/api';
import './MisPedidos.css';

const MisPedidos = () => {
  const { numero } = useParams();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [cuentas, setCuentas] = useState([]); // Nueva variable para guardar las cuentas
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Traemos los pedidos de la base de datos
        const dataPedidos = await listarMisPedidos();
        setPedidos(dataPedidos);

        // 2. Traemos las cuentas activas (Igual que hace el AccountsPanel)
        const mesaData = await obtenerMesaPorNumero(numero);
        const cuentasData = await obtenerCuentasMesa(mesaData.id);
        setCuentas(cuentasData);
      } catch (err) {
        setError(err.message);
      }
    };
    cargarDatos();
  }, [numero]);

  // Agrupamos cruzando los datos: Pedidos + Cuentas
  const resumen = pedidos.reduce((acc, p) => {
    
    // MAGIA ACÁ: Buscamos el ID del pedido dentro de las cuentas activas que trajimos
    const cuentaReal = cuentas.find(c => c.id === p.cuentaId);
    
    // Si la encuentra, obligamos al sistema a usar su nombre exacto (Ej: "Cuenta 1"). 
    const nombreFinal = cuentaReal ? cuentaReal.nombre : (p.Cuenta?.nombre || `Cuenta ${p.cuentaId}`); 
    
    if (!acc[nombreFinal]) {
      acc[nombreFinal] = { total: 0, items: [] };
    }
    acc[nombreFinal].total += Number(p.total);
    acc[nombreFinal].items.push(p);
    return acc;
  }, {});

  const totalMesa = pedidos.reduce((acc, ped) => acc + Number(ped.total), 0);

  return (
    <div className="mis-pedidos-page">
      <header className="mis-pedidos-header">
        <button className="mis-pedidos-back" onClick={() => navigate(`/${numero}/cuentas`)}>
          ←
        </button>
        <h2>Mesa {numero} - Mis Pedidos</h2>
      </header>

      <div className="mis-pedidos-list">
        {Object.entries(resumen)
          .sort(([nombreA], [nombreB]) => nombreA.localeCompare(nombreB, undefined, { numeric: true }))
          .map(([nombreCuenta, datos]) => (
          <div key={nombreCuenta} className="mis-pedidos-card">
            <h3>
              {nombreCuenta} (Gasto: ${datos.total.toFixed(2)})
            </h3>
            {datos.items.map((pedido, index) => (
              <div key={pedido.id} className={`mis-pedidos-order ${index !== datos.items.length - 1 ? 'mis-pedidos-order-border' : ''}`}>
                <ul>
                  {pedido.PedidoItems.map(item => (
                    <li key={item.id}>
                      <div className="mis-pedidos-row">
                        <span>{item.cantidad}x {item.nombreProducto}</span>
                        <strong>${Number(item.subtotal).toFixed(2)}</strong>
                      </div>
                      {/* Muestra precio unitario solo si se pidio mas de 1  */}
                      {item.cantidad > 1 && (
                        <div className="mis-pedidos-unit">
                          (${Number(item.precioUnitario).toFixed(2)} c/u)
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mis-pedidos-total">
        <p>TOTAL DE LA MESA</p>
        <h2>${totalMesa.toFixed(2)}</h2>
      </div>

    </div>
  );
};

export default MisPedidos;
