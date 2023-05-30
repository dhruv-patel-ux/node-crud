const express = require('express');
const app = express.Router();
const user = require('../controller/user');
const Login = require("../controller/login")
app.post('/add_user',user.addUser);
app.post('/userlogin',Login.login)
app.get('/get_user',user.getUser);
app.patch('/update_user/:id',user.update_user);
app.delete('/delete_user/:id',user.deleteUser);
module.exports = app;