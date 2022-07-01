const express = require('express');
const router = express.Router();
const { mustloginJwt } = require('../middlewares/auth');
const users = require('../controllers/UserController');

router.get('/', mustloginJwt, users.getAllUser);
router.post('/', mustloginJwt, users.createUser);
router.get('/:id', mustloginJwt, users.getUser);
router.put('/:id', mustloginJwt, users.editUser);
router.delete('/:id', mustloginJwt, users.deleteUser);

module.exports = router;