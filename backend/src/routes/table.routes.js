const express = require("express");
const { Mesa } = require("../models");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/mesas", async (req, res) => {
  const mesas = await Mesa.findAll();
  res.json(mesas);
});

router.get("/mesas/numero/:numero", async (req, res) => {
  try {
    const { numero } = req.params;
    const mesa = await Mesa.findOne({ where: { numero } });
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar la mesa" });
  }
});

router.post("/mesas", verificarToken, async (req, res) => {
  const mesa = await Mesa.create(req.body);
  res.status(201).json(mesa);
});

module.exports = router;
