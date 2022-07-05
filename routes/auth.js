const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/admin/login', authController.loginAdmin);
router.post('/admin/register', authController.registerUser);

router.post('/account/login', authController.loginCustomer);

router.post('/seller/login', authController.loginSeller);

module.exports = router;