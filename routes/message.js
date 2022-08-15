const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const messages = require('../controllers/MessageController');

router.get('/lists',  function(req, res, next) {
    res.render('list', { title: 'List Chat'});
});

router.get('/contact-chat', function(req, res, next) {
    res.render('contactChat', { title: 'Contact Chat'});
});
router.get('/chats/:chat_group', function(req, res, next) {
    res.render('chat', { title: 'Chat', chat_group: req.params.chat_group });
});
router.post('/init-chat', userLoginJwt (['customer','seller']), messages.initChat);
router.get('/history-chat/:chatGroup', userLoginJwt (['customer','seller']), messages.getHistoryChat);
router.get('/getSeller/:chatGroup', userLoginJwt (['customer','seller']), messages.getSeller);
router.get('/getCustomer/:chatGroup', userLoginJwt (['customer','seller']), messages.getCustomer);
router.get('/conversation', userLoginJwt (['customer','seller']), messages.getConversation);
module.exports = router;