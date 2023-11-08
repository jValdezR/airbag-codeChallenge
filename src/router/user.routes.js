const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/users/',userMiddleware.verifyPost, userController.createUser);
// router.get('/users/:userId',verifyGet, userController.readUser);
router.get('/users/', userMiddleware.verifyGet, userController.readUser);

module.exports = router;
