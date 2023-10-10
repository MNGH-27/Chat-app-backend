const express = require('express')

// routers
const authRouter = require('./auth/auth.routes')
const userRouter = require('./user/user.routes')
const roomRouter = require('./room/room.routes')

// api Router
const api = express.Router()

// app router
api.use('/auth', authRouter)
api.use('/user', userRouter)
api.use('/room', roomRouter)

module.exports = api
