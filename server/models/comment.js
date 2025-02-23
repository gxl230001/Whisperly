// Comment Schema
const commentSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  comment: {
      type: String,
      required: [true, 'Please provide a comment']
  },
  post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
  }
});

module.exports=mongoose.model('Comment',commentsSchema);