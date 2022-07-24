
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const productController = require('../../controllers/mobile/ProductController');
const shopRequestController = require('../../controllers/mobile/ProductController2');
const cartController = require('../../controllers/mobile/cartController');
const ProductController2 = require('../../controllers/mobile/ProductController2');
const InqueryController = require('../../controllers/mobile/InqueryController');
const userController = require('../../controllers/mobile/user/userController');
const app_advertisement = require('../../controllers/mobile/appAdvertisement/app_advertisement');




/******************** Auth  ****************************/
router.post('/signUp', authController.signUp);
router.post('/login', authController.login)
router.get('/listUser', authenticate(), authorization(), authController.listUser);
router.get('/authenticateUser', authenticate(),  authController.authenticateUser);



/********************** Vendor****************************/
router.post('/addProduct',   productController.addProduct);
router.post('/editProduct/:id', authenticate(),  productController.editProduct);
router.delete('/deleteProduct/:id',  productController.deleteProduct);
router.post('/changeProductStatus/:id', authenticate(),  productController.changeProductStatus);  
router.get('/listStoreCategory/:id', authenticate(),  productController.listStoreCategory);
router.get('/listStoreProduct/:id', productController.listStoreProduct); //add authroization

//updated router /********************************************************************************* */

router.get('/listCategory', ProductController2.listCategory);
// router.get('/listProduct',   ProductController2.listProduct);
router.get('/getProductDetail/:id',   ProductController2.productDetail )
router.get('/categoryProduct', ProductController2.categoryProduct )

//CART

router.post('/addUpdateCart2', authenticate(), cartController.addUpdateCart2)
router.post('/removeFromCart/:id', authenticate(), cartController.removeFromCart)
router.get('/listCart', authenticate(), cartController.listCart )
router.post('/checkout', authenticate(), cartController.checkout );
router.get('/listUserOrder', authenticate(), cartController.listUserOrder );


//INQUERY 
router.post('/postInquery', authenticate(), InqueryController.postInquery )

//





// --- // 



/******************* End User  ***************************/
router.get('/listStore', productController.listStore); 
// 
router.get('/listShopCategory/:id',  productController.listShopCategory)
// 
router.get('/storeChoiceProduct', productController.storeChoiceProduct )

// CART 
router.post('/addUpdateCart', authenticate(), cartController.addUpdateCart )


// 

//***************************** RESELLO APP UPDATED API */

/******************** Auth  ****************************/
router.post('/signUp', authController.signUp);
router.post('/login', authController.login)
router.get('/listUser', authenticate(), authorization(), authController.listUser);
router.get('/authenticateUser', authenticate(),  authController.authenticateUser);

// ---- //
router.get('/fetchUserAddress', authenticate(),  userController.fetchUserAddress ) // new
router.post('/updateUserAddress', authenticate(),  userController.updateUserAddress )

//********************** product listing/App ****************/


router.get('/listProduct', ProductController2.listProduct); // new

//-- //
router.get('/fetchAppAdvertisement',  app_advertisement.fetchAppAdvertisement)




module.exports = router;