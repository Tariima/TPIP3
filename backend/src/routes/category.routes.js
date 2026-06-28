// rutas basicas de categorias, leer es abierto y crear pide token
const express = require("express");
const { Categoria } = require("../models");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// lista todas las categorias, lo puede ver cualquiera
router.get("/", async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
});

// crear categoria solo si estas logueado
router.post("/", verificarToken, async (req, res) => {
  const categoria = await Categoria.create(req.body);
  res.status(201).json(categoria);
});

module.exports = router;
