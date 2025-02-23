const mongoose=require("mongoose");
//const User=require('../models/user.js');
//require("dotenv").config({path:__dirname+'/../.env'});
function connectDB(){
  return mongoose.connect(`mongodb+srv://legabrielle03:Giahien%402005@whisperly.gmgbu.mongodb.net/Main`)
}

//connectDB();


module.exports={connectDB};
