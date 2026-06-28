// modelo del pedido, es el carrito ya confirmado que va a la cocina con su estado y total
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'mesa'
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente' // arranca pendiente y el personal lo va cambiando hasta entregarlo
  },
  notas: {
    type: DataTypes.TEXT
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  cuentaId: {
    type: DataTypes.INTEGER,
    allowNull: true 
  }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedido;
