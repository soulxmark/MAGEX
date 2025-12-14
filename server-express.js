require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
let dbConnected = false;

async function connectDB() {
  if (!MONGO_URI) {
    console.warn('MONGODB_URI not provided — running without DB. Set MONGODB_URI in .env to enable DB.');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    dbConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
}

connectDB();

// Schemas
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

// API routes
app.post('/api/contact', async (req, res) => {
  if (!dbConnected) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
    const doc = await Contact.create({ name, email, message });
    res.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/portfolio', async (req, res) => {
  if (!dbConnected) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 }).limit(50).lean();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/portfolio', async (req, res) => {
  if (!dbConnected) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const { title, description, image } = req.body;
    if (!title) return res.status(400).json({ error: 'Missing title' });
    const doc = await Portfolio.create({ title, description, image });
    res.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// fallback for SPA or unknown routes — serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MAGEX Express server listening on http://localhost:${PORT}`);
  if (!MONGO_URI) console.log('Reminder: set MONGODB_URI in .env to enable database features.');
});
