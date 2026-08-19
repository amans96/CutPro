import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import prisma from './prisma.js'; // Import the shared connection
import shopRoutes from './routes/shop.routes.js';
import staffRoutes from './routes/staff.routes.js';
import serviceRoutes from './routes/service.routes.js';
import queueRoutes from './routes/queue.routes.js';
import productRoutes from './routes/product.routes.js';
dotenv.config();

const app = express();
// ... the rest of your index.js code stays exactly the same!
const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARE (Must come before routes)
// ==========================================
app.use(cors());
app.use(express.json()); 
app.use('/api/shops', shopRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/inventory', productRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Barber API is running smoothly!' });
});

// ==========================================
// 3. SOCKETS & SERVER START
// ==========================================
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});