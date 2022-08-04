const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const seller = require('../controllers/SellerController');

router.get('/', userLoginJwt (['admin']), seller.getAllSeller);
router.get('/contact-seller', userLoginJwt (['customer']), seller.getContactSeller);
router.put('/account/verify/:token', seller.verifyEmail);
router.post('/register', seller.registerSeller);
router.get('/:id', userLoginJwt (['admin','seller']), seller.getSeller);
router.put('/:id', userLoginJwt (['admin','seller']), seller.editSeller);
router.delete('/:id', userLoginJwt (['admin','seller']), seller.deleteSeller);

module.exports = router;