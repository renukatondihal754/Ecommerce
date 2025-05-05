const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Category;
