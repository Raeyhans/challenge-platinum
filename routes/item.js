const express = require('express');
const router = express.Router();
const { userLoginJwt } = require('../middlewares/auth');
const item = require('../controllers/ItemController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
})
   
const upload = multer({ storage: storage }).array("image", 4);

const doUploadFile = (req, res, next) => {
    upload(req, res, (err) => {
      if (err !== undefined) {
          res.status(400).json({
            errors: [
              {
                param: 'image',
                msg: 'Image is required.',
              },
            ],
          });
      }
      const paths = req.files.map((file) => file.path);
  
      req.body.image = paths;
      next();
    });
};

router.get('/', item.getItems);
router.get('/:id/images', item.getImage);
router.post('/', userLoginJwt (['seller','admin']), item.createItem);
router.post('/addImage', userLoginJwt (['seller','admin']), doUploadFile, item.addImage);
router.get('/:id', item.getItem);
router.put('/:id', userLoginJwt (['seller','admin']), item.editItem);
router.delete('/:id', userLoginJwt (['seller','admin']), item.deleteItem);

module.exports = router;