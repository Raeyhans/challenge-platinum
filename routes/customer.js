const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const customers = require('../controllers/CustomerController');

router.get('/', userLoginJwt (['admin']), customers.getAllCustomer);
router.get('/:id', userLoginJwt (['admin','customer']), customers.getCustomer);
router.put('/:id', userLoginJwt (['admin','customer']), customers.editCustomer);
router.get('/account/verify/:token', customers.verifyEmail);
router.delete('/:id', userLoginJwt (['admin']), customers.deleteCustomer);
router.post('/account/register', customers.registerCustomer);

module.exports = router;