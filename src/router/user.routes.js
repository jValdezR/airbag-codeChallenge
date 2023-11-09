const express = require('express');
const router = express.Router();
const { createUser, findUser } = require('../controllers/user/user.controller');
const { verifyPost, verifyGet } = require('../middlewares/user.middleware');

// Define a route for creating a new user
router.post('/users/', verifyPost, createUser);

// Define a route for finding users
router.get('/users/', verifyGet, findUser);

module.exports = router;
