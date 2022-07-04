const express = require('express');
const router = express.Router();
const { sellerLoginJwt } = require('../middlewares/sellerAuth');
const order = require('../controllers/OrderController');

router.post('/', sellerLoginJwt, order.createOrder);
router.get('/', sellerLoginJwt, order.getOrders);
router.get('/:id', sellerLoginJwt, order.getOneOrder);
router.put('/:id', sellerLoginJwt, order.updateOrder);

module.exports = router;