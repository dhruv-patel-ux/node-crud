const userModel = require('../model/user');
 

exports.addUser = async (req,res)=>{
    let user = new userModel(req.body);

    try{
         await user.save();
         res.status(200).send({message:'success' ,data:user});
    }catch(error){
        console.log('somthing went wrong',error)
    }
}
exports.getUser = async (req,res)=>{
    let user = await userModel.find({});
    try {
        res.send(user)

    }catch(error){
        res.send(error);
    }
}

exports.update_user= async (req,res)=>{
    const _id= req.params.id
    try{

        let user = await userModel.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        console.log(user)
        if(user){
            res.status(200).send(user);
        }else{
            res.status(200).send("user does not exist");
        }
        

    }catch(error){
        console.log(error);
        // res.send(error)
    }
}
exports.deleteUser=async (req,res)=>{
    const _id= req.params.id
    console.log(_id)
    try{
        const user = await userModel.findByIdAndDelete(_id,{  new:true})
        res.send(user);
    }catch(error){
        console.log(error);
        res.send(error);
    }
}