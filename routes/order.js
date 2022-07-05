const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const order = require('../controllers/OrderController');

router.post('/', userLoginJwt (['customer']), order.createOrder);
router.get('/', userLoginJwt (['admin','seller']), order.getOrders);
router.get('/:id', userLoginJwt (['admin','seller','customer']), order.getOneOrder);
router.put('/:id', userLoginJwt (['admin']), order.updateOrder);

module.exports = router;