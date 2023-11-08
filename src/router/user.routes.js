const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/user.controller');

router.post('/users', userController.createUser);
// router.get('/users/:userId', userController.readUser);
router.get('/users/', userController.readUser);

module.exports = router;
