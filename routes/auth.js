const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/admin/login', authController.loginAdmin);
router.post('/admin/register', authController.registerUser);

router.get('/account/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
router.get('/account/register', function(req, res, next) {
    res.render('register', { title: 'Sign Up' });
});
router.post('/account/login', authController.loginCustomer);

router.post('/seller/login', authController.loginSeller);

module.exports = router;