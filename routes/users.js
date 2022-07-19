const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const users = require('../controllers/UserController');

router.get('/', userLoginJwt (['admin']), users.getAllUser);
router.post('/', userLoginJwt (['admin']), users.createUser);
router.post('/admin/register', users.registerUser);
router.get('/:id', userLoginJwt (['admin']), users.getUser);
router.put('/:id', userLoginJwt (['admin']), users.editUser);
router.delete('/:id', userLoginJwt (['admin']), users.deleteUser);

module.exports = router;