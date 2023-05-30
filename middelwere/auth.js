const jwt =  require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req,res,next)=>{
    try{
        const token= req.header('Authorization').replace("Bearer","");
        const decoded = jwt.verify(token,"forAuthenticationToken");
        const user = await User.findOne({ _id:decoded._id, "token.token": token });
        if(!user){
            throw new Error()
        }
        req.user =user;
        next();
        console.log(token);
    }catch(error){
        res.status(401).send({error:'please authenticate'})
    }
}

module.exports = auth;