const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    }
},
{timestamps:true});

const product = mongoose.model("Product",productSchema);
module.exports = product;