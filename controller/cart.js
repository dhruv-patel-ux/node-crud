const cartModel = require('../model/cart');

exports.addCart = async (req,res)=>{
    try{
        
        const {productId, quantity} = req.body;
        const cart = new cartModel({
            productId,
            userId:req.user._id,
            quantity
        });
        const addCart= await cart.save();
        res.send({
            message:"add to cart successfully",
            data:addCart
            
        });
    }catch(err){
        console.log(err);
    }
}

exports.getUserCart = async (req,res) =>{
    try{

        const userId =  req.user._id;
        const cart = await cartModel.aggregate([
            {$match:{userId}},
            {
                $lookup:{
                    "from": "products",
                    "localField": "productId",
                    "foreignField": "_id",
                    "as": "product"
                },
            },
            {$unwind:"$product"},
            {
                $project:{
                    _id:0,
                    productId:0,
                    userId:0,
                    __v:0
                }
            },
            {
                $facet:{
                    products:[
                        {$skip:0},
                        {$limit:5}
                    ],
                    total:[
                        {$group:{
                            _id:null,
                            totalProduct:{$sum:1}
                        }}
                    ]
                }
            }
        ]);
        
        res.send({
            message:"success",
            productList:cart[0].products,
            total:cart[0].total[0].totalProduct
        });
    }catch (err){
        console.log(err);
    }
}

exports.removeFromCart = async (req,res) =>{
    try{
        userId = req.user._id;
        productId = req.params.id
        const q1={userId};
        const q2={productId}
        cartModel.aggregate([
            {$match:{
                $and:[
                    {q1},
                    {q2}
                ]
            }
            }]).then((results) => {
                // Delete the matching documents
                console.log(results);
                const deletePromises = results.map((doc) => doc.remove());
                return Promise.all(deletePromises);
              })
              .then((deletedDocs) => {
                console.log(`${deletedDocs.length} documents deleted.`);
              })
              .catch((error) => {
                console.error('Error deleting documents:', error);
              });
        console.log(removeProduct);
        // res.send({
        //     message:"product removed successfully",
        //     data:removeProduct
        // });
    }catch(err){
        console.log(err);
    }
}