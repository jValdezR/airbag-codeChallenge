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


/**
 * @swagger
 * components:
 *  schemas:
 *      Vehicle:
 *          type: object
 *          properties:
 *              plate:
 *                  type: string
 *                  description: The number of the plate
 *              niv:
 *                  type: string
 *                  description: The niv of the vehicle
 *              brand:
 *                  type: string
 *                  description: The brand of the vehicle
 *              typeOfVehicle:
 *                  type: string
 *                  description: The vehicle form
 *              price:
 *                  type: number
 *                  description: The price of the vehicle
 *          required:
 *              - plate
 *              - niv
 *              - brand
 *              - typeOfVehicle
 *              - price
 *          example:
 *              plate: 123-456-789
 *              niv: 4T1BE32K55U678421
 *              brand: mazda
 *              typeOfVehicle: sedan
 *              price: 240000
 */

// Define a route for getting the prices of vehicles
/**
 * @swagger
 * /api/vehicles/price/:
 *  get:
 *      summary: get all vehicles registered and the price in different currencies
 *      tags: [Vehicle]
 *      responses:
 *          200: 
 *              description: Response with array of all vehicles
 * 
 */
router.get('/vehicles/price/', getPrice);

// Define a route for creating a new vehicle
/**
 * @swagger
 * /api/vehicles/:
 *  post:
 *      summary: create a vehicle
 *      tags: [Vehicle]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref:  '#/components/schemas/Vehicle'
 *      responses:
 *          200: 
 *              description: Vehicle has been created
 *          400:
 *              description: niv or plate already exists
 *          406:
 *              description: required attribute not included
 *          
 * 
 */
router.post('/vehicles/', verifyPost, createVehicle);

// Define a route for updating a vehicle
/**
 * @swagger
 * /api/vehicles/:
 *  patch:
 *      summary: update a vehicle
 *      tags: [Vehicle]
 *      parameters:
 *        - in: query
 *          name: term
 *          schema:
 *            type: string
 *            description: 'term to find the vehicle (id, niv, plate)'
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref:  '#/components/schemas/Vehicle'
 *      responses:
 *          200: 
 *              description: Vehicle has been updated
 *          404:
 *              description: Vehicle not found
 *          406:
 *              description: term is required
 *          
 * 
 */
router.patch('/vehicles/', verifyPatch, updateVehicle);

// Define a route for deleting a vehicle
/**
 * @swagger
 * /api/vehicles/:
 *  delete:
 *      summary: remove a vehicle
 *      tags: [Vehicle]
 *      parameters:
 *          -   in: query
 *              name: term
 *              schema:
 *                  type: string
 *              description: 'Send term (id, niv, plate)'    
 *      responses:
 *          200: 
 *              description: Vehicle has been finded
 *          404:
 *              description: Vehicle not found
 * 
 */
router.delete('/vehicles/', verifyDelete, removeVehicle);

// Define a route for finding vehicles
/**
 * @swagger
 * /api/vehicles/:
 *  get:
 *      summary: find a vehicle or all vehicles registered
 *      tags: [Vehicle]
 *      parameters:
 *          -   in: query
 *              name: term
 *              schema:
 *                  type: string
 *              description: 'Send term (id, niv, plate) if you want to get just one vehicle'    
 *      responses:
 *          200: 
 *              description: Vehicle has been finded
 *          404:
 *              description: Vehicle not found
 * 
 */
router.get('/vehicles/', verifyGet, findVehicle);

module.exports = router;
