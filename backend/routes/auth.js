const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'eduplay-secret-key'

// Temporary in-memory users array (jab tak Supabase setup nahi)
const users = []

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user exists
    const existing = users.find(u => u.email === email)
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Save user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password_hash,
      role: role || 'student',
      total_xp: 0,
      current_level: 1,
      streak_count: 0,
      coins: 100
    }
    users.push(newUser)

    res.json({ success: true, message: 'Account created successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

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
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET CURRENT USER
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token' })

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find(u => u.id === decoded.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
      total_xp: user.total_xp,
      current_level: user.current_level,
      coins: user.coins
    })
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

module.exports = router