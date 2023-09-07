const express = require('express')

// routers
const authRouter = require('./auth/auth.routes')

// api Router
const api = express.Router()

// app router
api.use('/auth', authRouter)

module.exports = api
