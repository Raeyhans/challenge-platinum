const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const category = require('../controllers/CategoryController');

router.get('/', userLoginJwt (['admin','seller','customer']), category.getCategories);
router.post('/', userLoginJwt (['admin']), category.createCategory);
router.get('/:id', userLoginJwt (['admin','seller','customer']), category.getCategory);
router.put('/:id', userLoginJwt (['admin']), category.editCategory);
router.delete('/:id', userLoginJwt (['admin']), category.deleteCategory);

module.exports = router;