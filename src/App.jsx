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

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Rutas que requieren sesion iniciada */}
        {/* <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route> */}

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
