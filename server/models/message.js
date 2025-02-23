const commentSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  message: {
      type: String,
      required: [true, 'Please provide a message']
  },
  chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true
  }
});
userSchema.statics.createNewUser=async function (email,firstName,lastName,password, dob,gender){
  console.log(email);
  return await this.create({email:email,firstName:firstName,lastName:lastName,password:password,dob:dob,gender:gender});
};
module.exports=mongoose.model('message',commentsSchema);