import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Store room users
interface RoomUsers {
  [room: string]: Set<string>;
}

const roomUsers: RoomUsers = {};

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room
  socket.on("join-room", (data: { room: string; username: string }) => {
    const { room, username } = data;
    
    // Initialize room if it doesn't exist
    if (!roomUsers[room]) {
      roomUsers[room] = new Set();
    }
    
    // Add user to room
    roomUsers[room].add(username);
    
    // Join socket.io room
    socket.join(room);
    
    console.log(`${username} joined room: ${room}`);
    
    // Notify others in the room
    socket.to(room).emit("user-joined", {
      username,
      room,
      users: Array.from(roomUsers[room]),
    });
    
    // Send confirmation and current users to the joining user
    socket.emit("room-joined", {
      room,
      username,
      users: Array.from(roomUsers[room]),
    });
  });

  // Send message
  socket.on("send-message", (data: { room: string; username: string; message: string }) => {
    const { room, username, message } = data;
    
    console.log(`Message in ${room} from ${username}: ${message}`);
    
    // Broadcast to all users in the room
    io.to(room).emit("receive-message", {
      username,
      message,
      timestamp: new Date().toISOString(),
    });
  });

  // Leave room
  socket.on("leave-room", (data: { room: string; username: string }) => {
    const { room, username } = data;
    
    if (roomUsers[room]) {
      roomUsers[room].delete(username);
      
      // Clean up empty rooms
      if (roomUsers[room].size === 0) {
        delete roomUsers[room];
      }
    }
    
    socket.leave(room);
    
    console.log(`${username} left room: ${room}`);
    
    // Notify others
    socket.to(room).emit("user-left", {
      username,
      room,
      users: roomUsers[room] ? Array.from(roomUsers[room]) : [],
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

