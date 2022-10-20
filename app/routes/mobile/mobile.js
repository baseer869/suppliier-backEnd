
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



//--//
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authenticate("mobile"), authController.logout);
router.get("/getProfile", authenticate("mobile"), authController.getProfile);
//--//
router.get('/UserWallet', authenticate("mobile"), cartController.UserWallet );
//--//
router.get('/searchProduct',   ProductController2.searchProduct);
//--//
router.post('/addToCart', authenticate("mobile"), cartController.addToCart)
router.post('/removeFromCart', authenticate("mobile"), cartController.removeFromCart);
router.get('/listCart', authenticate("mobile"), cartController.listCart);
router.get('/countCart', authenticate("mobile"), cartController.countCart);


router.post('/checkout2', authenticate("mobile"), cartController.checkout2)
router.get('/listOrder', authenticate("mobile"), cartController.listOrder );
//--//
router.post('/checkout', authenticate("mobile"), cartController.checkout );

//--//


//--//
router.post('/addAddress', authenticate("mobile"), cartController.addAddress)
router.get('/getAddress', authenticate("mobile"), cartController.getAddress)
router.get('/listAddress',  cartController.listAddress)
router.post('/editAddress', authenticate("mobile"), cartController.eidtAddress)

//--//
router.post('/listRecentSearches',  cartController.listRecentSearches)

//--//
router.get('/listProduct', ProductController2.listProduct); // new
router.get('/ProductDetail/:id',   ProductController2.productDetail )
router.get('/categoryList/:id',   ProductController2.categoryList )

//--//
//Transcation 

router.post('/transcationRequest', authenticate("mobile"), cartController.transcationRequest)




// old
//
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
router.get('/categoryProduct', ProductController2.categoryProduct )

//CART

router.post('/addUpdateCart2', authenticate(), cartController.addUpdateCart2)
router.post('/removeFromCart/:id', authenticate(), cartController.removeFromCart)
router.get('/listCart', authenticate(), cartController.listCart )
// router.get('/listUserOrder', authenticate(), cartController.listUserOrder );


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
// router.post('/addUpdateCart', authenticate(), cartController.addUpdateCart )


// 

//***************************** RESELLO APP UPDATED API */

/******************** Auth  ****************************/
// router.post('/signUp', authController.signUp);
// router.post('/login', authController.login)
router.get('/listUser', authenticate(), authorization(), authController.listUser);
router.get('/authenticateUser', authenticate(),  authController.authenticateUser);

// ---- //
router.get('/fetchUserAddress', authenticate(),  userController.fetchUserAddress ) // new
router.post('/updateUserAddress', authenticate(),  userController.updateUserAddress )

//********************** product listing/App ****************/



//-- //
router.get('/fetchAppAdvertisement',  ProductController2.fetchAppAdvertisement)




module.exports = router;