const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pruebaRoutes = require('./routes/prueba.routes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.use('/api', pruebaRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      console.log('Base de datos sincronizada');
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

startServer();
