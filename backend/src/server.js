const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pruebaRoutes = require("./routes/prueba.routes");
const authRoutes = require("./routes/auth.routes");
const menuRoutes = require('./routes/menu.routes');
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const accountRoutes = require("./routes/account.routes");
const tableRoutes = require("./routes/table.routes");
const cartRoutes = require("./routes/cart.routes");
const { sequelize } = require("./models");
const cargarDatosIniciales = require("./seed");

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.use("/api", pruebaRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/categorias", categoryRoutes);
app.use("/api/productos", productRoutes);
app.use("/api", accountRoutes);
app.use("/api", tableRoutes);
app.use("/api", cartRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    await cargarDatosIniciales();

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      console.log("Base de datos sincronizada");
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
};

startServer();
