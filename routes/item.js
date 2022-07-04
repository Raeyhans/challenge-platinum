const express = require('express');
const router = express.Router();
const { sellerLoginJwt } = require('../middlewares/sellerAuth');
const item = require('../controllers/ItemController');

router.get('/', sellerLoginJwt, item.getItems);
router.post('/', sellerLoginJwt, item.createItem);
router.post('/addImage', sellerLoginJwt, item.addImage);
router.get('/:id', sellerLoginJwt, item.getItem);
router.put('/:id', sellerLoginJwt, item.editItem);
router.delete('/:id', sellerLoginJwt, item.deleteItem);

module.exports = router;