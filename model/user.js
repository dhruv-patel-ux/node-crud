const mongose = require('mongoose');
const userSchema= mongose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    }
},
{timestamps:true})
const User = mongose.model("User",userSchema);
module.exports = User;