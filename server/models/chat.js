const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
  messages:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"Message",
    default:[]
  },
  users:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"User",
    default:[]
  }
})



module.exports=mongoose.model('Chat',chatSchema);