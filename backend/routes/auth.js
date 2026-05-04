const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// REGISTER Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Save to Supabase
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ 
        name, 
        email, 
        password_hash, 
        role: role || 'student',
        total_xp: 0,
        current_level: 1,
        streak_count: 0,
        coins: 100
      }])
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        total_xp: user.total_xp,
        current_level: user.current_level,
        coins: user.coins
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /me Route
router.get('/me', async (req, res) => {
  try {
    // Verify Bearer token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from Supabase using the ID retrieved from the decoded token
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        total_xp: user.total_xp,
        current_level: user.current_level,
        coins: user.coins
      }
    });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
