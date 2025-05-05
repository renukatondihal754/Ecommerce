const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Cart = sequelize.define('Cart', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
});

module.exports = Cart;
