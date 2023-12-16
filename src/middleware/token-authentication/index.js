const jwt = require('jsonwebtoken')

const { ROUTES_WHITE_LIST } = require('./../../utils/constants')

function tokenAuthenticationMiddleWare(req, res, next) {
  // Get the token from the request headers or cookies or wherever you store it
  const BearerToken = req.headers.authorization

  // check if route is UnAuthenticate Route
  if (ROUTES_WHITE_LIST.includes(req.url)) {
    return next()
  }

  // check if there is token in token field
  if (!BearerToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = BearerToken.split('Bearer ')[1]

  // Check if the token exists in bearer token
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

module.exports = tokenAuthenticationMiddleWare
