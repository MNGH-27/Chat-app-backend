const passport = require('passport')
const jwt = require('jsonwebtoken')

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

// Setup the options for the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key_here' // Replace with your secret key
}

// Create the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  // Here, you would typically query your database to find the user by ID
  // Check if the user exists or if the payload data is valid
  // For example, you might have:
  // User.findById(jwt_payload.id)
  //   .then(user => {
  //     if (user) {
  //       return done(null, user);
  //     }
  //     return done(null, false);
  //   })
  //   .catch(err => done(err, false));

  // For demonstration purposes, assuming the payload has user information
  return done(null, jwt_payload)
})

// Tell passport to use the JWT strategy
passport.use(jwtStrategy)

// Middleware function to protect routes
const protectRoute = passport.authenticate('jwt', { session: false })

// Example route protected by JWT authentication
app.get('/protected-route', protectRoute, (req, res) => {
  // If the user reaches this point, it means they are authenticated via JWT
  res.json({ message: 'Authenticated successfully!' })
})
