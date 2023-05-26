const express = require('express');
const app = express();
const user = require('../controller/user')
app.post('/add_user',user.addUser);
app.get('/get_user',user.getUser);
app.patch('/update_user/:id',user.update_user);
app.delete('/delete_user/:id',user.deleteUser);
module.exports = app;