const mangoose = require("mongoose");

const connectDB = ()=>{
  mangoose
  .connect("mongodb+srv://testing:testing123@cluster0.qgdgxji.mongodb.net/")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });  
}
module.exports=connectDB;
