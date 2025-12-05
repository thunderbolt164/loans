const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');

// Load env vars
dotenv.config();

// Connect to database
const connectDB = require('./config/database');
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banks', require('./routes/banks'));
app.use('/api/loans', require('./routes/loans'));
app.use('/api/verify', require('./routes/documents'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Loan Comparison Platform API is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  Loan Comparison Platform - Backend Ready  ║
║  Port: ${PORT}                            ║
║  Initialize: POST /api/init-banks           ║
╚════════════════════════════════════════════╝
  `);
});