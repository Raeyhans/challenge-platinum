const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const item = require('../controllers/ItemController');
const multer = require ('../config/multer')

router.get('/', item.getItems);
router.get('/:id/images', item.getImage);
router.post('/', userLoginJwt (['seller']), item.createItem);
router.post('/addImage', userLoginJwt (['seller']), multer.array('image'), item.addImage);
router.get('/:id', item.getItem);
router.put('/:id', userLoginJwt (['seller','admin']), item.editItem);
router.delete('/:id', userLoginJwt (['seller','admin']), item.deleteItem);

module.exports = router;