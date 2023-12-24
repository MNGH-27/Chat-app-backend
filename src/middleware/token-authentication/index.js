const passport = require('passport')
const ROUTES_WHITE_LIST = require('../../utils/constants/routes-white-list')

// Middleware function to protect routes
const protectRoute = passport.authenticate('jwt', { session: false })

// Custom middleware to check if the route is in the whitelist
const passportMiddleware = (req, res, next) => {
  if (ROUTES_WHITE_LIST.includes(req.url)) {
    // Skip authentication for routes in the whitelist
    return next()
  }
  // Apply authentication for other routes
  return protectRoute(req, res, next)
}

module.exports = {
  passportMiddleware
}
