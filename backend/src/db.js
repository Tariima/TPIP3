// conexion a la base de datos sqlite con sequelize, se reusa en todo el backend
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  // el archivo de la base sale de la variable de entorno o usa este por defecto
  storage: process.env.DB_STORAGE || 'bar_qr.sqlite',
  logging: false
});

module.exports = sequelize;
