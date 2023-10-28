const express = require('express')

// CONTROLLER
const roomController = require('./../../controller/room/room.controller')

// MIDDLEWARE
const Validator = require('./../../middleware/request-validator')


// ROUTER
const router = express.Router()

router.post('/connectRoom', Validator('connectRoomSchema'), roomController.connectRoom)

module.exports = router
