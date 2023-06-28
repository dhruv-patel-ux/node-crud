const express = require('express');
const router = express.Router();
const cart = require('../controller/cart');
const {auth} = require('../middelwere/auth');

router.use(auth);
router.post('/addCart',cart.addCart);
router.get('/getCart',cart.getUserCart);
router.delete('/removeFromCart/:id',cart.removeFromCart);
module.exports = router;