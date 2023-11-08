const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../config/postgres'); // Import the pre-configured Sequelize instance

// Define the model for the "User" entity
const User = sequelize.define('User', {
  // Define the "id" attribute as a UUID with an automatically generated default value
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true, // It's a primary key
  },
  // Define the "name" attribute as a string that cannot be null
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Define the "phone" attribute as a string that can be null and must be unique
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  // Define the "email" attribute as a string that cannot be null, must be unique, and validate it as an email
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Apply validation to ensure it's a valid email address
    }
  },
});

module.exports = User; // Export the "User" model for use in other parts of the application
