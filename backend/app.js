const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const articleRoutes = require('./routes/articles');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const adminUserRoutes = require('./routes/adminUserRoutes');
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
// app.use(helmet());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(cookieParser());

// CORS middleware
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Static uploads with CORS headers
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}, express.static(path.join(__dirname, 'public/uploads')));

// API Routes
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use("/api/contact", contactRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
