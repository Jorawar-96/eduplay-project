const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const userRole = role === 'teacher' ? 'teacher' : 'student';

    // Save user to Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password_hash, role: userRole }]);

    if (error) throw error;

    res.json({ success: true, message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'eduplay-secret-key',
      { expiresIn: '7d' }
    );

    delete user.password_hash; // Don't send hash to client
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message || "Login failed" });
  }
});

// GET /api/auth/me (Protected Route)
router.get('/me', authMiddleware, async (req, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, name, email, role, total_xp, current_level, streak_count, coins')
    .eq('id', req.user.userId)
    .single();

  if (error || !user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
});

module.exports = router;