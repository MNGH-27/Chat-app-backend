const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// use Database Schema
const userSchema = require('./../../model/user/user.schema')

// use default whiteList for skip this routes
const generateFileLink = require('../../utils/helper/generate-file-link')

// Setup the options for the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET // Replace with your secret key
}

// Create the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, (user, done) => {
  // Here, you would typically query your database to find the user by ID
  userSchema
    .findById(user.id)
    .then((user) => {
      if (user) {
        return done(null, {
          email: user.email,
          id: user.id,
          userName: user.userName,
          profile: generateFileLink(user.profile)
        })
      }
      return done(null, false)
    })
    .catch((err) => done(err, false))
})

// Tell passport to use the JWT strategy
passport.use(jwtStrategy)
