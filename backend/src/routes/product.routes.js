// rutas basicas de productos, trae cada uno con su categoria
const express = require("express");
const { Producto, Categoria } = require("../models");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// lista los productos sumando los datos de la categoria
router.get("/", async (req, res) => {
  const productos = await Producto.findAll({
    include: Categoria,
  });

  res.json(productos);
});

// crear producto solo con token
router.post("/", verificarToken, async (req, res) => {
  const producto = await Producto.create(req.body);
  res.status(201).json(producto);
});

module.exports = router;
