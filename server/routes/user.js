const express=require('express');
const { addNewUser, getUser } = require('../controllers/user');
const {authenticateUser}=require('../middleware/user.js')
const router=express.Router();

router.route('/signup').post(addNewUser);
router.route('/login').post(authenticateUser,getUser);


module.exports=router;