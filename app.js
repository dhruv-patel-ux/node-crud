require('./mongoose/mongoose');
const express = require("express");
const router = require("./router/user");
const app = express();
// mongoose.connect('mongodb+srv://dhruvsoftreine:ECQ2tbXKj9rxt0V0@cluster0.7ucrknj.mongodb.net/crud?retryWrites=true&w=majority',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
//   const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

app.use(express.json());
app.use("/api/v1/",router);


app.listen(3000,()=>{
    console.log("Server is running at port 3000");
});
