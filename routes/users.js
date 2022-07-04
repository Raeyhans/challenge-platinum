const express = require('express');
const router = express.Router();
const { adminLoginJwt } = require('../middlewares/adminAuth');
const users = require('../controllers/UserController');

router.get('/', adminLoginJwt, users.getAllUser);
router.post('/', adminLoginJwt, users.createUser);
router.get('/:id', adminLoginJwt, users.getUser);
router.put('/:id', adminLoginJwt, users.editUser);
router.delete('/:id', adminLoginJwt, users.deleteUser);

module.exports = router;