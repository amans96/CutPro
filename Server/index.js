import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import prisma from './prisma.js';
import shopRoutes from './routes/shop.routes.js';
import staffRoutes from './routes/staff.routes.js';
import serviceRoutes from './routes/service.routes.js';
import queueRoutes from './routes/queue.routes.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app); 

// Socket.io CORS setup
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
const allowedOrigins = [
  'http://localhost:5173', // Local Vite frontend development
  'https://your-frontend-domain.vercel.app' // Replace with your actual hosted frontend URL later
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json()); 

// ==========================================
// 2. ROUTES
// ==========================================
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