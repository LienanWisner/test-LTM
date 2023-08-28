import express from 'express';
import http from 'http';
import {Server as SocketServer} from 'socket.io';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../src/routes/index.js';
import morgan from "morgan"
import Message from './models/Message.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors:{
    origin: "*"
  }
});

// Middleware
app.use(cors());
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use("/", router)

// MongoDB connection
const uri = process.env.URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('DB connected');
})
.catch((error) => {
  console.error('Error al conectar a la base de datos:', error.message);
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  
  // Event handler
  socket.on("send-message", (content, sender) => {
    socket.emit("receive-message", content, sender);
  });

  socket.on('disconnect', () => {
    console.log('Usuario disconnected:', socket.id);
  });
});

// Start server
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on: ${port}`);
});

