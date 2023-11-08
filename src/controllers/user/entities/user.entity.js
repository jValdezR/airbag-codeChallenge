const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../config/postgres');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = User;
