import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login/Login";
import Home from "./components/home/Home";
import Protected from "./components/routing/protected/Protected";
import Producto from "./components/product/Product";
import CategoryItem from "./components/categoriesItem/CategoryItem";
import Categories from "./components/categories/Categories";

function App() {
  return (
    // <Routes>
    //   <Route path="/login" element={<Login />} />

    //   {/* Rutas que requieren sesion iniciada */}
    //   <Route element={<Protected />}>
    //     <Route path="/" element={<Home />} />
    //   </Route>

    //   {/* Cualquier otra ruta redirige al inicio */}
    //   <Route path="*" element={<Navigate to="/" replace />} />
    // </Routes>
    <>
      <Categories></Categories>
    </>
  );
}

export default App;
