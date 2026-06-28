import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login/Login";
import Home from "./components/home/Home";
import Protected from "./components/routing/protected/Protected";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";
import AccountsPanel from "./components/accountPanel/AccountsPanel";
import Cart from "./components/cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleProtected from "./components/routing/protected/RoleProtected";
import Registro from "./components/auth/registro/registro";
import AdminUsuarios from "./components/admin/AdminUsuarios";
import MenuAdmin from "./components/admin/MenuAdmin";
import MesasAdmin from "./components/admin/MesasAdmin";
import PedidosPanel from "./components/admin/PedidosPanel";
import ValidarMesa from "./cliente/ValidarMesa";
import MesaProtected from "./components/routing/protected/MesaProtected";
import MisPedidos from "./cliente/MisPedidos";
import ThemeToggle from "./components/common/ThemeToggle";


function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas compartidas para todo el personal logueado */}
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Rutas SOLO para super-admin */}
        <Route element={<RoleProtected rolesPermitidos={['super-admin']} />}>
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        </Route>

        {/* Rutas para super-admin Y admin */}
        <Route element={<RoleProtected rolesPermitidos={['super-admin', 'admin']} />}>
          <Route path="/admin/productos" element={<MenuAdmin />} />
          <Route path="/admin/mesas" element={<MesasAdmin />} />
          <Route path="/admin/pedidos" element={<PedidosPanel />} />
        </Route>

        {/*RUTAS PÚBLICAS DEL CLIENTE (CARTA QR)*/}
            
        {/* 1. Al escanear el QR, el cliente entra primero a validar el PIN (pública) */}
        <Route path="/:numero" element={<ValidarMesa />} />

        {/* 2. Resto del flujo del cliente: requiere sesión de mesa validada por PIN */}
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
