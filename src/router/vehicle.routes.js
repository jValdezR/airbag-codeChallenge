const express = require('express');
const router = express.Router();
const {
  verifyPost,
  verifyGet,
  verifyPatch,
  verifyDelete,
} = require('../middlewares/vehicle.middleware');
const {
  createVehicle,
  findVehicle,
  updateVehicle,
  removeVehicle,
  getPrice,
} = require('../controllers/vehicle/vehicle.controller');

// Define a route for getting the prices of vehicles
router.get('/vehicles/price/', getPrice);

// Define a route for creating a new vehicle
router.post('/vehicles/', verifyPost, createVehicle);

// Define a route for updating a vehicle
router.patch('/vehicles/', verifyPatch, updateVehicle);

// Define a route for deleting a vehicle
router.delete('/vehicles/', verifyDelete, removeVehicle);

// Define a route for finding vehicles
router.get('/vehicles/', verifyGet, findVehicle);

module.exports = router;
