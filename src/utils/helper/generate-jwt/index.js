const jwt = require('jsonwebtoken')

const generateJwt = ({ id, userName, email, role }) => {
  // Set expiration for 3 days (72 hours)
  const expiresIn = 3 * 24 * 60 * 60 // 3 days in seconds

  // Create a JWT token with user data and a secret key
  const token = jwt.sign(
    { id, userName, email, role, expired_at: parseInt(new Date().getTime() / 1000) },
    process.env.JWT_SECRET,
    { expiresIn }
  )

  return token
}

module.exports = generateJwt
