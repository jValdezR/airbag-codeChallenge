const express = require('express');
const router = express.Router();
const {createUser, readUser} = require('../controllers/user/user.controller');
const {verifyPost, verifyGet} = require('../middlewares/user.middleware');

router.post('/users/',verifyPost, createUser);
router.get('/users/', verifyGet, readUser);

module.exports = router;
