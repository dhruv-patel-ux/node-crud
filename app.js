require('./mongoose/mongoose');
const express = require("express");
const app = express();

const UserRouter = require("./router/user");
app.use(express.json());
app.use("/api/v1/user/",UserRouter);
const dotenv = require('dotenv');
dotenv.config();

const port =  process.env.PORT | 3000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});
