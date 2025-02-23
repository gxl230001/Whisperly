const mongoose=require("mongoose");
const User=require('./user.js');
const user = require("./user.js");

const chatSchema=new mongoose.Schema({
  messages:{
    type:[],
    default:[]
  },
  users:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"User",
    default:[]
  }
})

chatSchema.statics.createChat=async function (userId1,userId2){
  const chat=await this.create({});
  const user1=await User.getUserById(userId1);
  const user2=await User.getUserById(userId2);
  user1.groups.push(chat._id);
  user2.groups.push(chat._id);
  chat.users.push(user1._id);
  chat.users.push(user2._id);
  await Promise.all([user1.save(), user2.save(), chat.save()]);
  return chat;
  
};



module.exports=mongoose.model('Chat',chatSchema);