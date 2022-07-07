const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const category = require('../controllers/CategoryController');

router.get('/', category.getCategories);
router.post('/', userLoginJwt (['admin']), category.createCategory);
router.get('/:id', category.getCategory);
router.put('/:id', userLoginJwt (['admin']), category.editCategory);
router.delete('/:id', userLoginJwt (['admin']), category.deleteCategory);

module.exports = router;