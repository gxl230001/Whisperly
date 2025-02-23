const { StatusCodes } = require("http-status-codes");
const User = require('../models/user.js');
const { verifyPassword, hashPassword } = require("../utils/crypt.js");

const authenticateUser=async (req,res,next)=>{
  const{email,password}=req.body;
  const user=await User.getUserByEmail(email);
  console.log(user);
  if(!user)
    return res.status(StatusCodes.NOT_FOUND).json({success:false,error:`Email doesn't exist`});
  const passwordMatch=user.password===password;
  if(!passwordMatch)
    return res.status(StatusCodes.UNAUTHORIZED).json({success:false,error:`Incorrect Password`});
  res.locals.user=user;
  next();
}

module.exports={authenticateUser};