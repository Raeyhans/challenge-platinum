const express = require('express');
const router = express.Router();
const { adminLoginJwt } = require('../middlewares/adminAuth');
const category = require('../controllers/CategoryController');

router.get('/', adminLoginJwt, category.getCategories);
router.post('/', adminLoginJwt, category.createCategory);
router.get('/:id', adminLoginJwt, category.getCategory);
router.put('/:id', adminLoginJwt, category.editCategory);
router.delete('/:id', adminLoginJwt, category.deleteCategory);

module.exports = router;