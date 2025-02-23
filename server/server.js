const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Adjust to match your client URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Store connected users
const users = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Add user to connected users
  users.set(socket.id, { id: socket.id });

  // Handle chat messages
  socket.on('chat message', (message) => {
    // Broadcast message to all other users
    socket.broadcast.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    users.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 