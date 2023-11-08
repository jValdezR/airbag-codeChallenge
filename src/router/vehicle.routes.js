const express = require('express');
const { verifyPost, verifyGet, verifyPatch, verifyDelete } = require('../middlewares/vehicle.middleware');
const { createVehicle, readVehicle, updateVehicle, removeVehicle } = require('../controllers/vehicle/vehicle.controller');
const router = express.Router();

router.post('/vehicles/',verifyPost, createVehicle);
router.patch('/vehicles/', verifyPatch, updateVehicle);
router.delete('/vehicles/', verifyDelete, removeVehicle);
router.get('/vehicles/', verifyGet, readVehicle);

module.exports = router;
