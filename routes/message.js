const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const messages = require('../controllers/MessageController');

// router.post('/send', messages.createMessage);
router.get('/lists', function(req, res, next) {
    res.render('list', { title: 'List Chat'});
});

router.get('/contact-chat', function(req, res, next) {
    res.render('contactChat', { title: 'Contact Chat'});
});
// router.get('/lists', userLoginJwt (['seller','customer']),  function(req, res, next) {
//     const {
//         user: {
//             id: admin
//         }
//     } = res;
//     res.render('list', { title: 'List Chat'});
// });

router.get('/chats', function(req, res, next) {
    res.render('chat', { title: 'Chat' });
});

router.get('/chats', (req, res) => {
    res.sendFile('/public/' +__dirname + '/chat.html')
})

router.get('/seller-contact-chat', userLoginJwt (['customer','seller']), messages.getSellerContactChat);
module.exports = router;