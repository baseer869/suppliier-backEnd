
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const productController = require('../../controllers/mobile/ProductController');
const shopRequestController = require('../../controllers/mobile/ProductController2');
const cartController = require('../../controllers/mobile/cartController');
const ProductController2 = require('../../controllers/mobile/ProductController2');




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

//updated router

router.get('/listCategory', ProductController2.listCategory);
router.get('/test2', productController.test);






// --- // 



/******************* End User  ***************************/
router.get('/listStore', productController.listStore); 
router.get('/listProduct/:id', productController.listProduct);
// 
router.get('/listShopCategory/:id',  productController.listShopCategory)
router.get('/categoryProduct', productController.categoryProduct )
// 
router.get('/storeChoiceProduct', productController.storeChoiceProduct )

// CART 
router.post('/addUpdateCart', authenticate(), cartController.addUpdateCart )
router.post('/addUpdateCart2', authenticate(), cartController.addUpdateCart2)
router.get('/listCart/:id', authenticate(), cartController.listCart )
router.post('/removeFromCart/:id', authenticate(), cartController.removeFromCart)
router.get('/getProductDetail/:id',   productController.productDetail )


// 







module.exports = router;