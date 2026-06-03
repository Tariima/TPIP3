import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Home from './components/home/Home';
import Protected from './components/routing/protected/Protected';
import AdminProtected from './components/routing/protected/adminProtected';
import Registro from './components/auth/registro/registro';
import AdminUsuarios from './components/admin/AdminUsuarios';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rutas que requieren sesion iniciada */}
      <Route element={<Protected />}>
        <Route path="/" element={<Home />} />
      
        {/* ruta exclusiva para Administradores */}
        <Route element={<AdminProtected />}>
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        </Route>
      </Route>

      {/* Cualquier otra ruta redirige al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
