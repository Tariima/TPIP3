import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Home from './components/home/Home';
import Protected from './components/routing/protected/Protected';
import RoleProtected from './components/routing/protected/RoleProtected';
import Registro from './components/auth/registro/registro';
import AdminUsuarios from './components/admin/AdminUsuarios';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

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

      {/* Ejemplo futuro: Rutas para super-admin Y admin (pero no clientes) */}
      {/* <Route element={<RoleProtected rolesPermitidos={['super-admin', 'admin']} />}>
        <Route path="/admin/productos" element={<MenuAdmin />} />
      </Route> 
      */}

      {/* Cualquier otra ruta redirige al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
