const mongoose =require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.mongooseConnectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
module.exports= mongoose;