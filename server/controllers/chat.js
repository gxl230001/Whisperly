const StatusCodes = require('http-status-codes');
const Chat=require('../models/chat');
const createNewChat=async (req,res)=>{
  console.log(req.body)
  const {userId1,userId2}=req.body;
  const chat=await Chat.createChat(userId1,userId2);
  console.log(chat)
  res.status(StatusCodes.CREATED).json({success:true,chat:chat._id});

}
module.exports={createNewChat};