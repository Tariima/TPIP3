const express = require("express");
const { Mesa, Cuenta } = require("../models");
const { verificarMesaToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/mesas/:mesaId/cuentas", verificarMesaToken, async (req, res) => {
  const { mesaId } = req.params;

  if (Number(mesaId) !== req.mesaCliente.mesaId) {
    return res.status(403).json({ mensaje: "No tenes permiso para ver esta mesa" });
  }

  const cuentas = await Cuenta.findAll({
    where: {
      mesaId,
      estado: "abierta",
    },
  });

  res.json(cuentas);
});

router.post("/mesas/:mesaId/cuentas", verificarMesaToken, async (req, res) => {
  const { mesaId } = req.params;
  const { nombre } = req.body;

  if (Number(mesaId) !== req.mesaCliente.mesaId) {
    return res.status(403).json({ mensaje: "No tenes permiso para crear cuentas en esta mesa" });
  }

  const mesa = await Mesa.findByPk(mesaId);

  if (!mesa) {
    return res.status(404).json({ mensaje: "Mesa no encontrada" });
  }

  const cantidadCuentas = await Cuenta.count({
    where: {
      mesaId,
    },
  });

  const cuenta = await Cuenta.create({
    nombre: nombre?.trim() || `Cuenta ${cantidadCuentas + 1}`,
    mesaId,
  });

  res.status(201).json(cuenta);
});

module.exports = router;
