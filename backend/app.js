const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'], // your frontend origins
  credentials: true,
}));

// Routes
const articleRoutes = require('./routes/articles');
const categoryRoutes = require('./routes/categories');

app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
