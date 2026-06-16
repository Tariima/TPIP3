const express = require("express");
const { Categoria } = require("../models");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
});

router.post("/", verificarToken, async (req, res) => {
  const categoria = await Categoria.create(req.body);
  res.status(201).json(categoria);
});

module.exports = router;
