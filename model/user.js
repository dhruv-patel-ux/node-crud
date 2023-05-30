const mongose = require('mongoose');
const bcrypt = require('bcryptjs');
const Token = require('jsonwebtoken')
const userSchema= mongose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String
    },
    age:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    token:[{
        token:{
            type:String
        }
    }]
},
{timestamps:true});
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next();
})
userSchema.methods.getAuthToken =  function() {
    const user = this;
    const jwt=  Token.sign({user_id:user._id},"forAuthenticationToken");
    return jwt;
}
const User = mongose.model("User",userSchema);

module.exports = User;