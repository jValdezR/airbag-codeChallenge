const express = require('express');
const { verifyPost, verifyGet, verifyPatch, verifyDelete } = require('../middlewares/vehicle.middleware');
const { createVehicle, findVehicle, updateVehicle, removeVehicle, getPrice } = require('../controllers/vehicle/vehicle.controller');
const router = express.Router();

router.get('/vehicles/price/', getPrice);
router.post('/vehicles/',verifyPost, createVehicle);
router.patch('/vehicles/', verifyPatch, updateVehicle);
router.delete('/vehicles/', verifyDelete, removeVehicle);
router.get('/vehicles/', verifyGet, findVehicle);


module.exports = router;
