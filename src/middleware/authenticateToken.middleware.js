const jwt = require('jsonwebtoken')

function authenticateToken (req, res, next) {
  // Get the token from the request headers or cookies or wherever you store it
  const BearerToken = req.headers.authorization

  const token = BearerToken.split('Bearer ')[1]

  // check if route is UnAuthenticate Route
  if (unAuthenticatUrl.includes(req.url)) {
    return next()
  }

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }


  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }
    // Attach the user data to the request object for future use
    req.user = user

    // Continue processing the request
    next()
  })
}

const unAuthenticatUrl = [
  '/v1/auth/login', '/v1/auth/signup'
]

module.exports = authenticateToken
