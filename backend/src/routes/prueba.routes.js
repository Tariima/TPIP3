const express = require('express');

const router = express.Router();

router.get('/prueba', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Conexion entre frontend y backend funcionando'
  });
});

module.exports = router;
