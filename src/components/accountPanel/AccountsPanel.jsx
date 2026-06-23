import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerMesaPorNumero, obtenerCuentasMesa, crearCuentaMesa } from "../../services/api";
import { sesionMesaValida } from "../../services/mesa/mesa.session";
import "./AccountsPanel.css";

function AccountsPanel() {
  const { numero: mesaId } = useParams(); // la ruta usa :numero; lo tomamos como mesaId
  const navigate = useNavigate();
  const [mesa, setMesa] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const mesaData = await obtenerMesaPorNumero(mesaId);
        setMesa(mesaData);
        const cuentasData = await obtenerCuentasMesa(mesaData.id);
        setAccounts(cuentasData);
      } catch (error) {
        console.error("Error al cargar datos de la mesa:", error);
        // Si se perdio la sesion de mesa (token rechazado), volvemos al PIN.
        if (!sesionMesaValida()) navigate(`/${mesaId}`);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [mesaId]);

  const handleCreateAccount = async () => {
    try {
      const nuevaCuenta = await crearCuentaMesa(mesa.id);
      setAccounts([...accounts, nuevaCuenta]);
    } catch (error) {
      if (!sesionMesaValida()) return navigate(`/${mesaId}`);
      alert("Error al crear la cuenta");
    }
  };

  const handleSelectAccount = (account) => {
    navigate(`/${mesaId}/category/${account.id}`);
  };

  if (loading) return <div className="accounts-panel">Cargando mesa {mesaId}...</div>;
  if (!mesa) return <div className="accounts-panel">La mesa {mesaId} no existe.</div>;

  return (
    <section className="accounts-panel">
      <div className="accounts-header">
        <div>
          <h2>Cuentas de la mesa</h2>
          <p>Mesa Número: {mesa.numero}</p>
        </div>

        <button className="create-account-button" onClick={handleCreateAccount}>
          Crear cuenta
        </button>
      </div>

      <div className="accounts-list">
        {accounts.length === 0 ? (
          <p>No hay cuentas abiertas. ¡Crea la primera!</p>
        ) : (
          accounts.map((account) => (
            <button
              key={account.id}
              className="account-card"
              onClick={() => handleSelectAccount(account)}
            >
              <span className="account-name">{account.nombre}</span>
              <span className="account-items">
                {account.estado}
              </span>
            </button>
          ))
        )}
      </div>
    </section>
  );
}

export default AccountsPanel;
