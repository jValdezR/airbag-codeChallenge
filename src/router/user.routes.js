const express = require('express');
const router = express.Router();
const {createUser, findUser} = require('../controllers/user/user.controller');
const {verifyPost, verifyGet} = require('../middlewares/user.middleware');

router.post('/users/',verifyPost, createUser);
router.get('/users/', verifyGet, findUser);

module.exports = router;
