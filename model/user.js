const mongose = require('mongoose');
const bcrypt = require('bcryptjs');
const Token = require('jsonwebtoken');

const userSchema= mongose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    roll : {
        type : String,
        default:'user'
    }
},
{timestamps:true});

userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next();
});

userSchema.methods.toJSON= function (){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject; 
}

const User = mongose.model("User",userSchema);

module.exports = User;