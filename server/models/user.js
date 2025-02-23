const mongoose = require('mongoose')

// User schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide your first name']
    },
    lastName:{
        type: String,
        required: [true, 'Please provide your last name']
    },
    password:{
        type: String,
        required: [true, 'Please provide a password']
    },
    email:{
        type: String,
        unique: [true, 'Email has already been used.'],
        required: [true, 'Please provide an email.'],
        lowercase: true,
        immutable: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
          ]
    },
    dob:{
        type:String,
        required: [true, 'Please provide a date of birth'],
    },
    gender:{
        type:String,
        required: [true, 'Please provide a gender'],
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    recommendations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    groups: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Chat',
        default: []
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: []
    },
    profilePictureId: {
        type: String,
        default: null
    }
});
userSchema.statics.createNewUser=async function (email,firstName,lastName,password, dob,gender){
    console.log(email);
    return await this.create({email:email,firstName:firstName,lastName:lastName,password:password,dob:dob,gender:gender});
};
userSchema.statics.getUserByEmail=async function(email){
    return (await this.find({email:email}))[0];
  }
  userSchema.statics.getUserById = async function (id) {
    return await this.findById(id);
};

userSchema.statics.getUserById = async function (id) {
    return await this.findById(id);
};
userSchema.statics.getAllUsers = async function () {
    return await this.find({});
  };
  

module.exports=mongoose.model('User',userSchema);

