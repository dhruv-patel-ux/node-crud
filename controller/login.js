const User = require("../model/user")
const bcrypt = require('bcryptjs');


exports.login = async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    const pass = await bcrypt.compare(req.body.password,user.password);
    if(!pass)
    {
       return res.status(401).send('invalide credential')
    }
    const token= user.getAuthToken();
    console.log(token)
    res.status(200).send(user);
}