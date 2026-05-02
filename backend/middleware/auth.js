const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'eduplay-secret-key'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' })
  }
}