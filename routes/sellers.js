const express = require('express');
const router = express.Router();
const { mustloginJwt } = require('../middlewares/auth');
const seller = require('../controllers/SellerController');

router.get('/', mustloginJwt, seller.getAllCustomer);
router.get('/:id', mustloginJwt, seller.getCustomer);
router.put('/:id', mustloginJwt, seller.editCustomer);
router.delete('/:id', mustloginJwt, seller.deleteCustomer);
router.post('/seller/register', seller.registerCustomer);

module.exports = router;