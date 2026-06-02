const express = require('express');
const { login, perfil } = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Login: valida credenciales y devuelve un token.
router.post('/login', login);

// Perfil: ruta protegida, devuelve el usuario autenticado a partir del token.
router.get('/perfil', verificarToken, perfil);

module.exports = router;
