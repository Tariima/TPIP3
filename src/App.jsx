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
import RoleProtected from './components/routing/protected/RoleProtected';
import Registro from './components/auth/registro/registro';
import AdminUsuarios from './components/admin/AdminUsuarios';
import MenuAdmin from './components/admin/MenuAdmin';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Rutas que requieren sesion iniciada */}
        {/* <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route> */}
      {/* Rutas para TODOS los logueados (super-admin, admin, cliente) */}
      <Route element={<Protected />}>
        <Route path="/" element={<Home />} />

        {/* Rutas compartidas, ej: ver menú, perfil, etc. */}
      </Route>

      {/* Rutas SOLO para super-admin */}
      <Route element={<RoleProtected rolesPermitidos={['super-admin']} />}>
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
      </Route>

      {/* Rutas para super-admin Y admin */}
      <Route element={<RoleProtected rolesPermitidos={['super-admin', 'admin']} />}>
        <Route path="/admin/productos" element={<MenuAdmin />} />
      </Route>

        {/* Cualquier otra ruta redirige al inicio */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

        <Route path="/:mesaId" element={<AccountsPanel />} />
        <Route path="/:mesaId/category/:accountId" element={<Categories />} />
        <Route path="/:mesaId/category/:accountId/:categoryName" element={<Products />} />
        <Route path="/:mesaId/cart/:accountId" element={<Cart />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
}

export default App;
