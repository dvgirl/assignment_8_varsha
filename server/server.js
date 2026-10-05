const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables from .env
dotenv.config();

// Initialize Express Application
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Built-in & Third-Party Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Task Manager Backend API is running smoothly 🚀',
    timestamp: new Date().toISOString()
  });
});

// 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this server`
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server Listener
app.listen(PORT, () => {
  console.log(`🚀 Express Server running on http://localhost:${PORT}`);
  console.log(`📡 Tasks API available at: http://localhost:${PORT}/api/tasks`);
});
