const StatusCodes = require('http-status-codes');
const { hashPassword } = require('../utils/crypt');
const User = require('../models/user.js')
const addNewUser= async (req,res)=>{
  const {firstName,lastName,email,password,dob,gender}=req.body;
  if(password.length<8)
    return res.status(StatusCodes.BAD_REQUEST).json({success:false,error:'Password needs to be at least 8 characters long'});
  try{
    await User.createNewUser(email,firstName,lastName,password,dob,gender);
    res.status(StatusCodes.CREATED).json({success:true});

  }catch(e){
    console.log(e);
    res.status(StatusCodes.BAD_REQUEST).json({success:false,message:e.message})

  }

}
const getUser=async(req,res)=>{
  res.status(StatusCodes.OK).json({success:true,user:res.locals.user});
}
const getFriends=async(req,res)=>{
  const {friendsId}=req.body;
  const results=[];
  for(id of friendsId){
    results.push(await User.getUserById(id));
    console.log(id)
  }
  console.log(results)
  res.status(StatusCodes.OK).json({success:true,friends:results});
}
const getAllUsers= async(req,res)=>{
  const users=await User.getAllUsers();
  const {userId, friendsId}=req.body;
  const filter=[...friendsId,userId];
  const results=users.filter((user)=>!filter.includes(user._id.toString()));
  console.log(users[0]._id)
  res.status(StatusCodes.OK).json({success:true,users:results});
}
  



module.exports={addNewUser,getUser,getFriends,getAllUsers}