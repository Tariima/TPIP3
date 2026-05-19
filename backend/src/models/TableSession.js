const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TableSession = sequelize.define('TableSession', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  closedAt: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'abierta'
  }
}, {
  tableName: 'table_sessions',
  timestamps: false
});

module.exports = TableSession;
