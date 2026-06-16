const express = require("express");
const { Mesa, Cuenta } = require("../models");

const router = express.Router();

router.get("/mesas/:mesaId/cuentas", async (req, res) => {
  const { mesaId } = req.params;

  const cuentas = await Cuenta.findAll({
    where: {
      mesaId,
      estado: "abierta",
    },
  });

  res.json(cuentas);
});

router.post("/mesas/:mesaId/cuentas", async (req, res) => {
  const { mesaId } = req.params;

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
    nombre: `Cuenta ${cantidadCuentas + 1}`,
    mesaId,
  });

  res.status(201).json(cuenta);
});

module.exports = router;
