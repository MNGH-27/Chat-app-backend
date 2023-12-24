const express = require('express')

// REQUIRE INSTALLED MIDDLE WARES
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')

// REQUIRE CUSTOM MIDDLEWARES
const api = require('./src/routes/api.routes')
const tokenAuthenticationMiddleWare = require('./src/middleware/token-authentication')

// create app
const app = express()

/**
 * * CUSTOM MIDDLEWARE
 * * Helper middle ware
 */
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: 10000 }))
app.use(cookieParser())

/**
 * * SANITIZE
 * * SANITIZE user requests
 */
app.use(mongoSanitize())

/**
 * * SERVER STATIC FILES
 * * Serve static files from the 'uploads' directory
 */
app.use('/files', express.static('src/uploads'))

/**
 * * CORS HANDLING
 */
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

/**
 * * PASSPORT JS
 * * [SH] Initialize Passport before using the route middleware
 */
app.use(passport.initialize())
app.use(tokenAuthenticationMiddleWare)

/**
 * * ROUTER
 * * ADD ROUTER =: API OF V1
 */
app.use('/v1', api)

module.exports = app
