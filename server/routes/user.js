const express=require('express');
const { addNewUser, getUser, getFriends, getAllUsers } = require('../controllers/user');
const {authenticateUser}=require('../middleware/user.js')
const router=express.Router();

router.route('/signup').post(addNewUser);
router.route('/login').post(authenticateUser,getUser);
router.route('/friends').post(getFriends);
router.route('/all').post(getAllUsers);


module.exports=router;