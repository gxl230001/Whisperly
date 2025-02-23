const express=require('express');
const {createNewChat}=require('../controllers/chat.js')
const {authenticateUser}=require('../middleware/user.js')
const router=express.Router();

router.route('/createChat').post(createNewChat);


module.exports=router;