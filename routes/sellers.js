const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const seller = require('../controllers/SellerController');

router.get('/', userLoginJwt (['admin','customer']), seller.getAllSeller);
router.get('/:id', userLoginJwt (['admin','seller']), seller.getSeller);
router.put('/:id', userLoginJwt (['admin','seller']), seller.editSeller);
router.put('/account/verify/:token', seller.verifyEmail);
router.delete('/:id', userLoginJwt (['admin','seller']), seller.deleteSeller);
router.post('/register', seller.registerSeller);

module.exports = router;