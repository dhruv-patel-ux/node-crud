const express = require('express');
const app = express.Router();
const user = require('../controller/user');


const loginAuth= (req,res,next)=>{
    try{

        brearToken= req.headers.authorization.split(' ');
        req.token =brearToken[1];
        next();
    }catch(err){
        req.send(err);
    }
    
    // next();
}

app.post('/add_user',user.addUser);
app.post('/login',user.login);
app.get('/get_user',loginAuth,user.getUser);
app.patch('/update_user/:id',user.update_user);
app.delete('/delete_user/:id',user.deleteUser);
module.exports = app;


