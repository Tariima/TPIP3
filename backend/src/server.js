const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pruebaRoutes = require('./routes/prueba.routes');

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.use('/api', pruebaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
