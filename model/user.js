const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    }
},
{timestamps:true});
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next();
})
const User = mongose.model("User",userSchema);

module.exports = User;