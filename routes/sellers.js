const express = require('express');
const router = express.Router();
const { sellerLoginJwt } = require('../middlewares/sellerAuth');
const seller = require('../controllers/SellerController');

router.get('/', sellerLoginJwt, seller.getAllSeller);
router.get('/:id', sellerLoginJwt, seller.getSeller);
router.put('/:id', sellerLoginJwt, seller.editSeller);
router.delete('/:id', sellerLoginJwt, seller.deleteSeller);
router.post('/register', seller.registerSeller);

module.exports = router;