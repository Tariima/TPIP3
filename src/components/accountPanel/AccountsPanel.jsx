import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerMesaPorNumero, obtenerCuentasMesa, crearCuentaMesa } from "../../services/api";
import { MesaContext } from "../../services/mesa/mesa.context";
import "./AccountsPanel.css";

function AccountsPanel() {
  const { numero: mesaId } = useParams(); // la ruta usa :numero; lo tomamos como mesaId
  const navigate = useNavigate();
  const { cerrarSesionMesa } = useContext(MesaContext);
  const [mesa, setMesa] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [modalError, setModalError] = useState("");

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
        if (error.sesionExpirada) {
          cerrarSesionMesa();
          navigate(`/${mesaId}`);
        }
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [mesaId]);

  const openCreateModal = () => {
    setAccountName("");
    setModalError("");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    if (creatingAccount) return;
    setShowCreateModal(false);
    setModalError("");
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const nombre = accountName.trim();

    if (!nombre) {
      setModalError("Ingresá un nombre para la cuenta");
      return;
    }

    try {
      setCreatingAccount(true);
      const nuevaCuenta = await crearCuentaMesa(mesa.id, nombre);
      setAccounts([...accounts, nuevaCuenta]);
      setShowCreateModal(false);
      setAccountName("");
    } catch (error) {
      if (error.sesionExpirada) {
        cerrarSesionMesa();
        return navigate(`/${mesaId}`);
      }
      setModalError("Error al crear la cuenta");
    } finally {
      setCreatingAccount(false);
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

        <button className="create-account-button" onClick={openCreateModal}>
          Crear cuenta
        </button>
        <button className="create-account-button" onClick={() => navigate(`/${mesaId}/mis-pedidos`)}>
          Mis pedidos
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

      {showCreateModal && (
        <div className="account-modal-backdrop">
          <div className="account-modal">
            <h3>Nueva cuenta</h3>
            <p>Ingresá un nombre para identificar esta cuenta.</p>

            <form onSubmit={handleCreateAccount}>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Ej: Familia Perez"
                autoFocus
              />

              {modalError && <span className="account-modal-error">{modalError}</span>}

              <div className="account-modal-actions">
                <button type="button" onClick={closeCreateModal} disabled={creatingAccount}>
                  Cancelar
                </button>
                <button type="submit" disabled={creatingAccount}>
                  {creatingAccount ? "Creando..." : "Crear cuenta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountsPanel;
