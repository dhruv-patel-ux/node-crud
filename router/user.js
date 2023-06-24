const express = require('express');
const app = express.Router();
const user = require('../controller/user');
const {auth,checkRoll} = require('../middelwere/auth');

// user
app.post('/add_user',user.addUser);
app.post('/login',user.login);

// only login user access this route 
app.use(auth);
app.get('/get_users',checkRoll,user.getUsers);
app.patch('/update_user/:id',user.update_user);
app.delete('/delete_user/:id',user.deleteUser);

// order 
app.post('/add_order',user.addOrder);
app.get('/get_all_order',user.getAllOrders);
app.get('/get_order',user.getOrder);
module.exports = app;


