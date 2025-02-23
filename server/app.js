const express = require('express');
const cors = require('cors'); 
const userRouter = require('./routes/user.js');
const chatRouter = require('./routes/chat.js');
const { connectDB } = require('./config/db.js');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api', userRouter);
app.use('/chat', chatRouter);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle joining a chat room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Handle new messages
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});