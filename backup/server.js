/**
 * Portfolio Server — Node.js + Express
 * Serves static files & handles contact form submissions
 */

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all static files from this directory
app.use(express.static(path.join(__dirname)));

// ── CORS headers ────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── Routes ──────────────────────────────────────

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form API
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, subject, message, timestamp } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Save to local JSON log
  const entry = { firstName, lastName, email, subject, message, timestamp };
  const logFile = path.join(__dirname, 'data', 'messages.json');

  // Ensure data directory exists
  if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  }

  let messages = [];
  if (fs.existsSync(logFile)) {
    try {
      messages = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    } catch (_) { messages = []; }
  }

  messages.push(entry);
  fs.writeFileSync(logFile, JSON.stringify(messages, null, 2), 'utf8');

  console.log('\n📬 New contact message received:');
  console.log(`   From: ${firstName} ${lastName} <${email}>`);
  console.log(`   Type: ${subject}`);
  console.log(`   Time: ${timestamp}\n`);

  res.json({ success: true, message: 'Message received successfully!' });
});

// View all messages (admin endpoint)
app.get('/api/messages', (req, res) => {
  const logFile = path.join(__dirname, 'data', 'messages.json');
  if (!fs.existsSync(logFile)) return res.json([]);
  try {
    const messages = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    res.json(messages);
  } catch (_) {
    res.json([]);
  }
});

// 404 fallback → serve index
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Start ────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║   🎨  Fuad Baharudin — Portfolio       ║');
  console.log('  ╠══════════════════════════════════════╣');
  console.log(`  ║   ✅  Running at:                    ║`);
  console.log(`  ║   👉  http://localhost:${PORT}          ║`);
  console.log('  ║                                      ║');
  console.log('  ║   📬  Contact API: /api/contact      ║');
  console.log('  ║   📋  Messages:    /api/messages     ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('\n');
});

module.exports = app;
