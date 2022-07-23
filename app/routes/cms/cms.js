
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const multer  = require('multer')
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv');
const path = require('path');
const mime = require('mime-types');
const ProductController2 = require('../../controllers/mobile/ProductController2');
const InqueryController = require('../../controllers/mobile/InqueryController');
const StoreController = require('../../controllers/mobile/StoreController');
const app_advertisement = require('../../controllers/mobile/appAdvertisement/app_advertisement');

/*******************************************************/
dotenv.config();
 

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

        var ext = String(path.extname(files.originalname)).trim().toLowerCase();

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

//  cloudinary.config({
//      cloud_name : process.env.CLOUDINARY_NAME,
//      api_key : process.env.CLOUDINARY_API_KEY,
//      api_secret : process.env.CLOUDINARY_API_SECRET
//  })

 
/******************** Auth  ****************************/
router.post('/signUp', authController.signUp );
router.post('/login', authController.login );

/*********************   ***************************/
// router.post('/addCategory', upload.single('attachement'), ProductController2.addCategory)
router.post('/addProduct',   ProductController2.addProduct);
router.get('/listProduct',   ProductController2.listProduct);
router.get('/getProductDetail/:id',   ProductController2.productDetail )
router.get('/categoryProduct', ProductController2.categoryProduct )

//INQUERY 
router.get('/listInquery', authenticate(), InqueryController.listInquery )



//UPDATED ROUTES FOR RESELLO 

router.post('/addCategory',  ProductController2.addCategory)



router.post('/createStoreCategory',  StoreController.createStoreCategory)
router.get('/listStoreCategory',  StoreController.listStoreCategory)

// STORE 
router.post('/createStore',  StoreController.createStore)
router.get('/listStore',  StoreController.listStore)

// addAppAdvertisement

router.post('/addAppAdvertisement',  app_advertisement.addAppAdvertisement)
router.get('/fetchAppAdvertisement',  app_advertisement.fetchAppAdvertisement)
router.post('/updateStatus/:id',  app_advertisement.updateStatus)


module.exports = router;
