const mongoose = require('mongoose');

let isConnected = false;

/**
 * Connect to MongoDB Database
 * Includes graceful connection handling and fallback.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo_manager';
    
    // Set a short timeout for connection attempt so we don't hang if local MongoDB is off
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️ Local MongoDB is not running (${error.message}).`);
    console.log(`💡 Note: The backend will seamlessly use In-Memory Database mode for local testing!`);
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
