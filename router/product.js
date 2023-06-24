const express = require('express');
const router = express.Router();
const product = require('../controller/product')
const {auth,checkRoll} = require('../middelwere/auth');

// get add product list and no need to login 
router.get('/getAllProducts',product.getAllProduct);

//login and access to get one product 
router.use(auth)
router.get('/getProduct/:id',product.getProduct);

// product actions only admin access
router.use(checkRoll);
router.post('/addProduct',product.addProduct);
router.patch('/updateProduct',product.updateProduct);
router.delete('/deleteProduct',product.deleteProduct);

module.exports = router;