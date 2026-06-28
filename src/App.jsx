import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Login from "./components/auth/login/Login";
import Home from "./components/home/Home";
import Registro from "./components/auth/registro/registro";
import AdminUsuarios from "./components/admin/AdminUsuarios";
import MenuAdmin from "./components/admin/MenuAdmin";
import MesasAdmin from "./components/admin/MesasAdmin";
import PedidosPanel from "./components/admin/PedidosPanel";
import ValidarMesa from "./cliente/ValidarMesa";
import MisPedidos from "./cliente/MisPedidos";
import AccountsPanel from "./components/accountPanel/AccountsPanel";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import Protected from "./components/routing/protected/Protected";
import RoleProtected from "./components/routing/protected/RoleProtected";
import MesaProtected from "./components/routing/protected/MesaProtected";
import ThemeToggle from "./components/common/ThemeToggle";

function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas del personal */}
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RoleProtected rolesPermitidos={['super-admin']} />}>
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        </Route>

        <Route element={<RoleProtected rolesPermitidos={['super-admin', 'admin']} />}>
          <Route path="/admin/productos" element={<MenuAdmin />} />
          <Route path="/admin/mesas" element={<MesasAdmin />} />
          <Route path="/admin/pedidos" element={<PedidosPanel />} />
        </Route>

        {/* Rutas del cliente (carta por QR) */}
        <Route path="/:numero" element={<ValidarMesa />} />
        <Route element={<MesaProtected />}>
          <Route path="/:numero/cuentas" element={<AccountsPanel />} />
          <Route path="/:mesaId/category/:accountId" element={<Categories />} />
          <Route path="/:mesaId/category/:accountId/:categoryName" element={<Products />} />
          <Route path="/:mesaId/cart/:accountId" element={<Cart />} />
          <Route path="/:numero/mis-pedidos" element={<MisPedidos />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
}

export default App;
