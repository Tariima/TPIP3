const sequelize = require('../db');

const Role = require('./Role');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Table = require('./Table');
const TableSession = require('./TableSession');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Table.hasMany(TableSession, { foreignKey: 'tableId' });
TableSession.belongsTo(Table, { foreignKey: 'tableId' });

User.hasMany(TableSession, { foreignKey: 'openedByUserId' });
TableSession.belongsTo(User, { foreignKey: 'openedByUserId', as: 'openedBy' });

TableSession.hasMany(Order, { foreignKey: 'tableSessionId' });
Order.belongsTo(TableSession, { foreignKey: 'tableSessionId' });

User.hasMany(Order, { foreignKey: 'createdByUserId' });
Order.belongsTo(User, { foreignKey: 'createdByUserId', as: 'createdBy' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  Role,
  User,
  Category,
  Product,
  Table,
  TableSession,
  Order,
  OrderItem
};
