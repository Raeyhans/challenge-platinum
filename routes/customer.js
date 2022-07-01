const express = require('express');
const router = express.Router();
const { mustloginJwt } = require('../middlewares/auth');
const customers = require('../controllers/CustomerController');

router.get('/', mustloginJwt, customers.getAllCustomer);
router.get('/:id', mustloginJwt, customers.getCustomer);
router.put('/:id', mustloginJwt, customers.editCustomer);
router.delete('/:id', mustloginJwt, customers.deleteCustomer);
router.post('/account/register', customers.registerCustomer);

module.exports = router;