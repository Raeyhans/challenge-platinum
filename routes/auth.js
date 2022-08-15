const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/admin/login', authController.loginAdmin);

router.get('/account/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
router.get('/account/register', function(req, res, next) {
    res.render('register', { title: 'Sign Up' });
});
router.post('/account/login', authController.loginCustomer);

router.post('/seller/login', authController.loginSeller);
router.get('/seller/login', function(req, res, next) {
    res.render('sellerlogin', { title: 'Login' });
});

module.exports = router;