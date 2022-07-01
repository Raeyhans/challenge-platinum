const express = require('express');
const router = express.Router();
const { mustloginJwt } = require('../middlewares/auth');
const order = require('../controllers/OrderController');

router.post('/', mustloginJwt, order.createOrder);
router.get('/', mustloginJwt, order.getOrders);
router.get('/:id', mustloginJwt, order.getOneOrder);
router.put('/:id', mustloginJwt, order.updateOrder);

module.exports = router;