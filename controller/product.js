const mongoose = require('mongoose');
const productModel = require('../model/product');


// add product
exports.addProduct =  async (req,res)=>{
    try{
        const  {name,price,description,category} = req.body
        const product = new productModel({
            name,
            price,
            description,
            category
        });

        const products = await product.save();

        res.send({
            message:"success",
            data:products
        });

    }catch(err){
        console.log(err);
    }
}

// getAll Product

exports.getAllProduct = async (req,res) =>{
    try{
        const page = Number(req.query.page) | 1;
        const limit = Number(req.query.limit) | 5;
        const skip = (page - 1) * limit;

        const products = await productModel.aggregate([
            {
                $facet:{
                    procuct:[
                        {$skip:skip},
                        {$limit:limit}
                    ],
                    total:[{
                        $group:{
                            _id:null,
                            totalProducts:{$sum:1}
                        }
                    }]
                }
            }
        ]);

        res.send({
            message:"success",
            data:products[0].procuct,
            total:products[0].total[0].totalProducts
        })
    }catch(err){
        console.log(err);
    }
}

// get single Product

exports.getProduct = async (req,res) =>{
    try{
        const id =  req.params.id
        const product = await productModel.findOne({_id:id});

        res.send({
            message:"success",
            data:product
        })
    }catch(err){
        console.log(err);
    }
}

// update Product

exports.updateProduct = async (req,res)=>{
    try{
        const id = req.query.id;

        const product = await productModel.findOneAndUpdate({_id:id},req.body)
        res.send({
            message:"product updated successfully",
            data:product
        });
    }catch(err){
        console.log(err);
    }
}

// delete Product

exports.deleteProduct = async (req,res)=>{
    const id = req.query.id;
    const procuct = await productModel.findOneAndDelete({_id:id});

    res.send({
        message:"product Deleted Successfully",
        data:procuct
    })
}