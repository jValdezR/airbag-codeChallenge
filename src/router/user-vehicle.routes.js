const express = require('express');
const { verifyPost } = require('../middlewares/user-vehicle.middleware');
const { createUserVehicle } = require('../controllers/user-vehicle/user-vehicle.controller');
const router = express.Router();

// Define a route for creating a user-vehicle relationship
router.post('/user-vehicle/', verifyPost, createUserVehicle);

module.exports = router;
