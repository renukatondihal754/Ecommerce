// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // adjust path based on your setup

const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
