const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/employees');

const app = express();

// ⭐ FIX CORS HERE
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // your React frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Handle preflight
app.options('*', cors());

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', empRoutes);

const PORT = process.env.PORT || 5000;

function startServer() {
  const server = app.listen(PORT, () => console.log('Server running on port', PORT));
  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Mongo connected');
    startServer();
  })
  .catch(err => {
    console.error('Mongo connection error:', err.message);
    startServer();
  });
