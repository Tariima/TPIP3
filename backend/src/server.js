// punto de arranque del backend, levanta express, conecta la base y registra las rutas de la api
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
const orderRoutes = require("./routes/order.routes");
const { sequelize } = require("./models");
const cargarDatosIniciales = require("./seed");

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// cors limitado al front y json para poder leer el body de las peticones
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// cada grupo de rutas cuelga de su prefijo dentro de /api
app.use("/api", pruebaRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/categorias", categoryRoutes);
app.use("/api/productos", productRoutes);
app.use("/api", accountRoutes);
app.use("/api", tableRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

const startServer = async () => {
  try {
    // sync con alter ajusta las tablas al modelo y despues se cargan los datos base
    await sequelize.sync({ alter: true });
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
