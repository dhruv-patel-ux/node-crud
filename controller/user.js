const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const key = "secureKey";
const bcrypt = require('bcryptjs');

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
    const decoded = jwt.verify(req.token,key,(err,decode)=>{
        if(err){
            res.status(401).send('token is expire');
        }
        else{
            return decode;
        }
    });
    try {
        res.send(decoded)

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
        console.log(user)
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

exports.login = async (req,res)=>{
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(user){
            const pass= bcrypt.compareSync(req.body.password,user.password);
            if(!pass) res.send('invalide password');
            const token= jwtToken(user);
            res.send({user,token}); 
        }
        else{
            res.send('invalide Email');
        }
    }catch(err){
        res.send({err});
    }

}
const jwtToken = (user) => {
    const signToken = jwt.sign({ user }, key, { expiresIn: '10000s' });
    return signToken;
}