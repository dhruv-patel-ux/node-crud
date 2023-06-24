const jwt =  require('jsonwebtoken');
const User = require('../model/user');
const dotenv = require('dotenv');
dotenv.config();

const jwtToken =  (user) => {
    const signToken =  jwt.sign({user},process.env.securityKey);
    return signToken;
}

const auth = async (req,res,next)=>{
    try{
        const token= req.header('Authorization').split(" ")[1];
        const decoded = jwt.verify(token,process.env.securityKey);
        const user = await User.findOne({ _id:decoded.user});
        if(!user){
            throw new Error()
        }
        req.user =user;
        next();
    }catch(error){
        res.status(401).send({error:'please authenticate'})
    }
}

const  checkRoll = (req,res,next)=>{
    if(req.user.roll !== 'admin'){
        return res.send({
            message: 'you are not authenticated for this route'
        }) 
    }
    next();
    }


module.exports = {jwtToken,auth,checkRoll};