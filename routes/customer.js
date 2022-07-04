const express = require('express');
const router = express.Router();
const { customerLoginJwt } = require('../middlewares/customerAuth');
const customers = require('../controllers/CustomerController');

router.get('/', customerLoginJwt, customers.getAllCustomer);
router.get('/:id', customerLoginJwt, customers.getCustomer);
router.put('/:id', customerLoginJwt, customers.editCustomer);
router.delete('/:id', customerLoginJwt, customers.deleteCustomer);
router.post('/account/register', customers.registerCustomer);

module.exports = router;