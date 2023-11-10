const express = require('express');
const router = express.Router();
const { createUser, findUser } = require('../controllers/user/user.controller');
const { verifyPost, verifyGet } = require('../middlewares/user.middleware');

// Define a route for finding users
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The user name
 *              phone:
 *                  type: string
 *                  description: The user phone number
 *              email:
 *                  type: string
 *                  description: The user email
 *          required:
 *              - name
 *              - phone
 *              - email
 *          example:
 *              name: Daniel
 *              phone: 0987654321
 *              email: email@mail.com
 */

/**
 * @swagger
 * /api/users/:
 *  get:
 *      summary: find an user or all user registered
 *      tags: [User]
 *      parameters:
 *          -   in: header
 *              name: api_key_name
 *              schema:
 *                  type: string 
 *          -   in: header
 *              name: api_key_value
 *              schema:
 *                  type: string 
 *          -   in: query
 *              name: term
 *              schema:
 *                  type: string
 *              description: 'Send term (id, email, phone) if you want to get just one user'   
 *      responses:
 *          200: 
 *              description: User has been finded
 *          404:
 *              description: User not found
 * 
 */
router.get('/users/', verifyGet, findUser);

// Define a route for creating a new user
/**
 * @swagger
 * /api/users/:
 *  post:
 *      summary: create an user
 *      tags: [User]
 *      parameters:
 *          -   in: header
 *              name: api_key_name
 *              schema:
 *                  type: string 
 *          -   in: header
 *              name: api_key_value
 *              schema:
 *                  type: string 
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *      responses:
 *          200: 
 *              description: User has been created
 *          400:
 *              description: Email or phone already exists
 *          406:
 *              description: Email or phone is required
 *          
 * 
 */
router.post('/users/', verifyPost, createUser);

module.exports = router;
