const express = require('express');
const userRouter=require('./routes/user.js');
const chatRouter=require('./routes/chat.js')
const { connectDB } = require('./config/db.js');
const app=express();
const cors = require('cors');
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.urlencoded({extended:false}));
//pare json
app.use(express.json());

app.use('/api',userRouter);
app.use('/chat',chatRouter);
app.listen(5000,()=>{
  console.log('server is listening on port 5000');
  connectDB();
});
