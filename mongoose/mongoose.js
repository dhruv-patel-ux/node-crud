const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://dhruvsoftreine:ECQ2tbXKj9rxt0V0@cluster0.7ucrknj.mongodb.net/crud?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
module.exports= mongoose;