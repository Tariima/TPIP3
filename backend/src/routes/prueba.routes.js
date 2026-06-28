// ruta de prueba para chequear que el front se conecta con el back
const express = require('express');

const router = express.Router();

// si responde ok es que la conexion anda
router.get('/prueba', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Conexion entre frontend y backend funcionando'
  });
});

module.exports = router;
