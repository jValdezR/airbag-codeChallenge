const express = require('express');
const { verifyPost } = require('../middlewares/user-vehicle.middleware');
const { createUserVehicle } = require('../controllers/user-vehicle/user-vehicle.controller');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      UserVehicle:
 *          type: object
 *          properties:
 *              userTerm:
 *                  type: string
 *                  description: The id, phone oe email of the user
 *              vehicleTerm:
 *                  type: string
 *                  description: The id, niv or plate of the vehicle
 *          required:
 *              - userTerm
 *              - vehicleTerm
 *          example:
 *              userTerm: mail@mail.com
 *              vehicleTerm: 4T1BE32K55U678421
 */

// Define a route for creating a user-vehicle relationship
/**
 * @swagger
 * /api/user-vehicle/:
 *  post:
 *      summary: create the relation between user and vehicle
 *      tags: [UserVehicle]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref:  '#/components/schemas/UserVehicle'
 *      responses:
 *          200: 
 *              description: Relation has been created
 *          400:
 *              description: Relation already exists
 *          404:
 *              description: User or Vehicle not found
 *          406:
 *              description: userTerm or vehicleTerm is required
 *          
 * 
 */
router.post('/user-vehicle/', verifyPost, createUserVehicle);

module.exports = router;