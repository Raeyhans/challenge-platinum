const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const item = require('../controllers/ItemController');

router.get('/', userLoginJwt (['seller','admin','customer']), item.getItems);
router.post('/', userLoginJwt (['seller','admin']), item.createItem);
router.post('/addImage', userLoginJwt (['seller','admin']), item.addImage);
router.get('/:id', userLoginJwt (['seller','admin','customer']), item.getItem);
router.put('/:id', userLoginJwt (['seller','admin']), item.editItem);
router.delete('/:id', userLoginJwt (['seller','admin']), item.deleteItem);

module.exports = router;