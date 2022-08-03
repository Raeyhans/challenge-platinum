const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const users = require('../controllers/UserController');

router.get('/', userLoginJwt (['admin']), users.getAllUser);
router.post('/', users.createUser);
router.get('/:id', userLoginJwt (['admin']), users.getUser);
router.put('/:id', userLoginJwt (['admin']), users.editUser);
router.delete('/:id', userLoginJwt (['admin']), users.deleteUser);

module.exports = router;