import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import apiRoutes from './src/routes/api.js';
import { setupWebSocket } from './src/websocket/chatSocket.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Routes
app.use('/api', apiRoutes);

// WebSocket Setup
setupWebSocket(io);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

httpServer.listen(PORT, () => {
  console.log(`Multimodal Server running on port ${PORT}`);
});
