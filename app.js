const express = require('express')

// REQUIRE INSTALLED MIDDLE WARES
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')

// REQUIRE CUSTOM MIDDLEWARES
const api = require('./src/routes/api.routes')
const authenticateToken = require('./src/middleware/authenticateToken.middleware')

// creat app
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
app.use(express.static('uploads'))

// CORS HADNLING
app.use(
  cors({
    origin: 'http://localhost:1380',
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
  res.header('Access-Control-Allow-Origin', 'http://localhost:1380')
  next()
})

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize())

// CUSTOM MIDDLE-WARE
app.use(authenticateToken)

// ADD ROUTER =: API OF V1
app.use('/v1', api)


module.exports = app
