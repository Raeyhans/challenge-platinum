const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.loginPost);

router.post('/register', authController.registerPost);

router.post('/account/login', authController.loginCustomer);

module.exports = router;