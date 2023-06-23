const express = require('express');
const app = express.Router();
const user = require('../controller/user');
const {auth} = require('../middelwere/auth');

// const loginAuth= (req,res,next)=>{
//     try{

//         brearToken= req.headers.authorization.split(' ');
//         req.token =brearToken[1];
//         next();
//     }catch(err){
//         req.send(err);
//     }
    
//     // next();
// }
app.post('/login',user.login);
app.use(auth);
app.post('/add_user',user.addUser);
app.get('/get_user',user.getUser);
app.patch('/update_user/:id',user.update_user);
app.delete('/delete_user/:id',user.deleteUser);
app.post('/add_order',user.addOrder);
app.get('/get_order',user.getOrders);
module.exports = app;


