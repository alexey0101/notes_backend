const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

router.post('/api/user', validateUser, userController.createUser);
router.post('/api/user/login', validateUser, userController.loginUser);
//router.post('/api/user/logout', userController.logoutUser);

module.exports = router;