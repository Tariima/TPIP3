import React, { useState } from "react";
import { initialAccounts } from "../test/accountMock";
import { useNavigate } from "react-router-dom";
import "./AccountsPanel.css";

function AccountsPanel({ tableCode = "MESA-12", onSelectAccount }) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialAccounts[0]?.id || null,
  );
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    const newAccount = {
      id: Date.now(),
      name: `Cuenta ${accounts.length + 1}`,
      tableCode,
      items: [],
    };

    setAccounts([...accounts, newAccount]);
    setSelectedAccountId(newAccount.id);

    if (onSelectAccount) {
      onSelectAccount(newAccount);
    }
  };

  const handleSelectAccount = (account) => {
    setSelectedAccountId(account.id);

    if (onSelectAccount) {
      onSelectAccount(account);
    }

    navigate(`/category/${account.id}`);
  };

  return (
    <section className="accounts-panel">
      <div className="accounts-header">
        <div>
          <h2>Cuentas de la mesa</h2>
          <p>Mesa: {tableCode}</p>
        </div>

        <button className="create-account-button" onClick={handleCreateAccount}>
          Crear cuenta
        </button>
      </div>

      <div className="accounts-list">
        {accounts.map((account) => (
          <button
            key={account.id}
            className={`account-card ${
              selectedAccountId === account.id ? "account-card-active" : ""
            }`}
            onClick={() => handleSelectAccount(account)}
          >
            <span className="account-name">{account.name}</span>
            <span className="account-items">
              {account.items.length} productos
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default AccountsPanel;
