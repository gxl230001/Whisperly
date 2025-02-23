// Post Schema
const postSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  tags: [{
      type: String
  }],
  description: {
      type: String,
      required: [true, 'Please provide a description']
  },
  image: {
      type: String,
      default: null
  },
  video: {
      type: String,
      default: null
  },
  likes: {
      type: Number,
      default: 0
  },
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
  }]
});

module.exports=mongoose.model('Post',postSchema);