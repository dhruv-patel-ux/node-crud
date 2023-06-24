const userModel = require('../model/user');
const orderModel = require('../model/order')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');
const {jwtToken} = require('../middelwere/auth');


// add new user or signup
exports.addUser = async (req, res) => {
    
    let verify = await userModel.findOne({ email: req.body.email });
    if (!verify) {
        let user = new userModel(req.body);
        try {
            await user.save();
            const token = jwtToken(user);
            res.status(200).send({ message: 'success', data: user, token });
        } catch (error) {
            console.log('somthing went wrong', error)
        }
    }
    else{
        res.send('email is already exist');
    }
}

// get all users
//  only admin access this route 

exports.getUsers = async (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;
    
    //  set usrr list data format

    try {
        const userList = await userModel.aggregate([
            {$match:{
                roll:'user'
            }},
            {
                $facet:{
                    users:[{
                        $project:{
                            password:0,
                            roll:0
                        }
                    },
                    {$skip:skip},
                    {$limit:limit}
                ],
                    total:[{
                        $group:{
                            _id:null,
                            totalUser:{$sum:1}
                        }
                    }]
                }
            }
        ])
        
        // send response 
        res.send({
            data: userList[0].users,
            total:userList[0].total[0].totalUser,
            message:"success"
        });

    }
    // catch error
    catch (error) {
        res.send(error);
    }
}

// update user

exports.update_user = async (req, res) => {
    const _id = req.params.id
    try {

        let user = await userModel.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(200).send("user does not exist");
        }

    } catch (error) {
        console.log(error);
        // res.send(error)
    }
}

exports.deleteUser = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await userModel.findByIdAndDelete(_id, { new: true })
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// add order ====>

exports.addOrder= async (req , res) =>{
    const {goodName,quantity,baseAmount} = req.body;
    const totalAmount = quantity * baseAmount;
    const order = new orderModel({
        goodName,
        quantity,
        baseAmount,
        totalAmount,
        user:req.user._id
    });

    const  newOrder =await order.save(); 
    res.send({
        message:"order created successfully",
        data:newOrder
    });
}

//  get order Details ==========>

exports.getAllOrders = async (req,res) =>{
    const orderList= await orderModel.aggregate([
        {$lookup:{
            from:'users',
            localField:"user",
            foreignField:'_id',
            as:"userDetails"
        }},
        {
            $unwind: "$userDetails"
        },
        {
            $project: {
              user: 0,
              __v:0,
              "userDetails.__v":0
            }
          }
    ]).exec();

    res.send({
        message:"success",
        data:orderList
    });
}

exports.getOrder = async (req, res) =>{
    try{
        //  quary 
        const orderList= await orderModel.aggregate([
            {
                $match:{
                    user:req.user._id
                }},
                {
                    $lookup:{
                        from: 'users',
                        localField: "user",
                        foreignField: '_id',
                        as: "userDetails"
                    }
                },
                {$unwind:"$userDetails"},
                {
                    $project:{
                        user:0
                    }
                },
                {
                    $facet: {
                      orders: [
                        { $skip: 2 }, 
                        { $limit: 2 },
                      ],
                      totalCount: [
                        {
                          $group: {
                            _id: null,
                            total: { $sum: 1 }
                          }
                        }
                      ]
                    }
                  }
            ]);
            
            // send data 
            res.send({
                message:"success",
                data:orderList[0].orders,
                total:orderList[0].totalCount[0].total
            });
           
    }catch(err){
        console.log(err);
    }

}

exports.login = async (req,res)=>{
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(user){
            const pass= bcrypt.compareSync(req.body.password,user.password);
            if(!pass) res.send('invalide password');
            const token= jwtToken(user._id);
            res.send({
                data:user,
                token
            }); 
        }
        else{
            res.send('invalide Email');
        }
    }catch(err){
        res.send({err});
    }

}
