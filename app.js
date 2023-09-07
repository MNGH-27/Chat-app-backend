const express = require('express')

// REQUIRE INSTALLED MIDDLE WARES
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const cookieParser = require('cookie-parser')

// REQUIRE CUSTOM MIDDLEWARES
const api = require('./src/routes/api.routes')

// creat app
const app = express()

// middle wares
// logger(morgan) are using the host parameter
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


// CORS HADNLING
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

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize())

// custom middleware
// app.use(authenticatedMiddleWare)

// ADD ROUTER =: API OF V1
app.use('/v1', api)


module.exports = app
