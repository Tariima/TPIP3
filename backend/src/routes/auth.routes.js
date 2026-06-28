// rutas de login, perfil y el abm de usuarios del sistema
const express = require('express');
const { login, perfil, crearUsuario, obtenerRoles, obtenerUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/auth.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware'); // <-- import actualizado

const router = express.Router();

// login abierto, cualquiera puede pegarle
router.post('/login', login);
// perfil necesita token para saber quien es
router.get('/perfil', verificarToken, perfil);

// --- rutas protegidas por roles ---
// usamos verificarRol(['super-admin']) para que solo ellos pasen
router.get('/roles', verificarToken, verificarRol(['super-admin']), obtenerRoles);
router.post('/registro', verificarToken, verificarRol(['super-admin']), crearUsuario);
router.get('/usuarios', verificarToken, verificarRol(['super-admin']), obtenerUsuarios);
router.put('/usuarios/:id', verificarToken, verificarRol(['super-admin']), actualizarUsuario);
router.delete('/usuarios/:id', verificarToken, verificarRol(['super-admin']), eliminarUsuario);

module.exports = router;
