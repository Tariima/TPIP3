// arma todas las rutas de la app y separa las del personal de las del cliente
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
        {/* el login es la unica ruta libre, el resto va protegido */}
        <Route path="/login" element={<Login />} />

        {/* rutas del personal */}
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* estas rutas solo las puede ver el super-admin */}
        <Route element={<RoleProtected rolesPermitidos={['super-admin']} />}>
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        </Route>

        <Route element={<RoleProtected rolesPermitidos={['super-admin', 'admin']} />}>
          <Route path="/admin/productos" element={<MenuAdmin />} />
          <Route path="/admin/mesas" element={<MesasAdmin />} />
          <Route path="/admin/pedidos" element={<PedidosPanel />} />
        </Route>

        {/* rutas del cliente (carta por qr) */}
        <Route path="/:numero" element={<ValidarMesa />} />
        {/* lo que cuelga de aca pide la sesion de mesa validada por pin */}
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
