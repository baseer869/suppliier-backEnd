
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const shopRequestController = require('../../controllers/mobile/ProductController2');
const multer  = require('multer')
const path = require('path');
const mime = require('mime-types');
const ProductController2 = require('../../controllers/mobile/ProductController2');

/*******************************************************/
var allowed = [];
let inc = 0;
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + inc++ + '.' + mime.extension(file.mimetype));
    }
});

allowed = ['.png', '.bmp', '.ico', '.gif', '.jpg', '.jpeg'];

var upload   = multer({  storage: storage,
    fileFilter: function(req, files, callback){
        console.log('file name ---', files);

        var ext = String(path.extname(files.originalname)).trim().toLowerCase();
        console.log('file name after parse ---', files);

        if(!allowed || !allowed.length){
            callback(null, true);
        }
        else if(allowed.toString().indexOf(ext) > -1){
            callback(null, true);
        }
        else{
            callback(null, false);
        }
    },
    // limits: {fileSize: 50 * 1024 * 1024}
 });

/******************** Auth  ****************************/
router.post('/signUp', authController.signUp );
router.post('/login', authController.login );

/********************* cms ***************************/
router.post('/addCategory', upload.single('attachement'), ProductController2.addCategory)
router.post('/addProduct',   ProductController2.addProduct);
router.get('/listProduct',   ProductController2.listProduct);





module.exports = router;
