const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// use Database Schema
const userSchema = require('./../../model/user/user.schema')

// Setup the options for the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key_here' // Replace with your secret key
}

// Create the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, (user, done) => {
  console.log('this is user : ', user)

  // Here, you would typically query your database to find the user by ID
  userSchema
    .findById(user._id)
    .then((user) => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    })
    .catch((err) => done(err, false))
})

// Tell passport to use the JWT strategy
passport.use(jwtStrategy)

// Middleware function to protect routes
const protectRoute = passport.authenticate('jwt', { session: false })

// Define your whitelist of routes
const whitelist = ['/login', '/public']

// Custom middleware to check if the route is in the whitelist
const checkTokenMiddleWare = (req, res, next) => {
  const currentRoute = req.path
  if (whitelist.includes(currentRoute)) {
    // Skip authentication for routes in the whitelist
    return next()
  }
  // Apply authentication for other routes
  return protectRoute(req, res, next)
}

module.exports = {
  checkTokenMiddleWare
}
