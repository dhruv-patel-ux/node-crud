const userModel = require('../model/user');
const orderModel = require('../model/order')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');
const {jwtToken} = require('../middelwere/auth');


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
exports.getUser = async (req, res) => {
    try {
        res.send({
            data: req.user,
            message:"success"
        })

    } catch (error) {
        res.send(error);
    }
}

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
    console.log(_id)
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

exports.getOrders = async (req,res) =>{
    const orderList = await orderModel.find({user:req.user._id});
    let ord= await orderModel.aggregate([
        {$lookup:{
            from:'User',
            localField:"user",
            foreignField:'_id',
            as:"userDetails"
        }}
    ]).exec();
    console.log(ord);
    // console.log( orderModel.aggregate([
    //     {$lookup:{
    //         from:'User',
    //         localField:"user",
    //         foreignField:'_id',
    //         as:"userDetails"
    //     }}
    // ]).exec().then(res =>{
    //     return res 
    // }))
    res.send({
        message:"success",
        data:orderList
    });
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
