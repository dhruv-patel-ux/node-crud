const mongoose = require('mongoose');

const order = mongoose.Schema({
    goodName:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    baseAmount:{
        type:Number,
        require:true
    },
    totalAmount:{
        type : Number,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('Order',order);