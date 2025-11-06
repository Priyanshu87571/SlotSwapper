// backend/index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Simple local storage for users
const USERS_FILE = path.join(__dirname, 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const TOKEN_EXP = '7d';

// Create users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Helpers
function readUsers() {
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data || '[]');
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function createToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_EXP }
  );
}

// Middleware for JWT verification
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid Authorization header' });
  }
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Routes

// Home
app.get('/', (req, res) => {
  res.send('SlotSwap Backend Running with JWT Auth ✅');
});

// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Missing fields' });

  const users = readUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    passwordHash: hash,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsers(users);

  const token = createToken(newUser);
  res.status(201).json({ token });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Missing fields' });

  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = createToken(user);
  res.json({ token });
});

// Protected Profile route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ id: req.user.sub, name: req.user.name, email: req.user.email });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
