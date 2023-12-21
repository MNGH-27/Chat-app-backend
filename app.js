const express = require('express')

// REQUIRE INSTALLED MIDDLE WARES
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')

// REQUIRE CUSTOM MIDDLEWARES
const api = require('./src/routes/api.routes')
const { tokenAuthenticationMiddleWare } = require('./src/middleware/')

// create app
const app = express()

// middle wares
// logger(morgan) are using the host parameter
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: 10000 }))
app.use(cookieParser())

// SANITIZE user requests
app.use(mongoSanitize())

// Serve static files from the 'uploads' directory
app.use('/files', express.static('src/uploads'))

// CORS HANDLING
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

// ADD ACCESS-CONTROL-CREDENTIAL
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// ADD ACCESS-CONTROL-ORIGIN => DOMAINS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})

// Import the secondary "Strategy" library
// const LocalStrategy = require('passport-local').Strategy

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
)

// init passport on every route call.
app.use(passport.initialize())

// allow passport to use "express-session".
app.use(passport.session())

// The "authUser" is a function that we will define later will contain the steps to authenticate a user, and will return the "authenticated user".
// passport.use(new LocalStrategy(authUser))

// CUSTOM MIDDLE-WARE
app.use(tokenAuthenticationMiddleWare)

// ADD ROUTER =: API OF V1
app.use('/v1', api)

module.exports = app
