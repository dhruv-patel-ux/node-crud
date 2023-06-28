const mongoose = require('mongoose');
  
const cartSchema =  mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
});

const cart = mongoose.model("cartModel",cartSchema);
module.exports = cart;