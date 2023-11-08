const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../config/postgres');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  plate: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  niv: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isNIV(value) {
        // Custom validation for NIV (National Identification Number)
        const nivRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
        if (!nivRegex.test(value)) {
          throw new Error('NIV not valid');
        }
      },
    },
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Mazda', 'Renault', 'Toyota', 'Volkswagen', 'Honda']],
      // Ensure 'brand' matches one of the allowed values.
    },
  },
  typeOfVehicle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['sedan', 'hb', 'suv', 'roadster']],
      // Ensure 'typeOfVehicle' matches one of the allowed values.
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      // Ensure 'price' is a non-negative value.
    },
  },
});

module.exports = Vehicle;
