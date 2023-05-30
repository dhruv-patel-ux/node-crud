require('./mongoose/mongoose');
const express = require("express");
const app = express();
const UserRouter = require("./router/user");
const LoginRouter = require("./router/login")
app.use(express.json());
app.use("/api/v1/user/",UserRouter);
app.use("/api/v1/log/",LoginRouter)


app.listen(3000,()=>{
    console.log("Server is running at port 3000");
});
