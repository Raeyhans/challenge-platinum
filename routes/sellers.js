const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const seller = require('../controllers/SellerController');

<<<<<<< HEAD
router.get('/', userLoginJwt (['seller']), seller.getAllSeller);
=======
router.get('/', userLoginJwt (['admin']), seller.getAllSeller);
router.get('/contact-seller', userLoginJwt (['customer']), seller.getContactSeller);
router.put('/account/verify/:token', seller.verifyEmail);
router.post('/register', seller.registerSeller);
>>>>>>> 4c9541e7560bbfcefa7264fefac0981d96f70ca1
router.get('/:id', userLoginJwt (['admin','seller']), seller.getSeller);
router.put('/:id', userLoginJwt (['admin','seller']), seller.editSeller);
router.delete('/:id', userLoginJwt (['admin','seller']), seller.deleteSeller);

module.exports = router;