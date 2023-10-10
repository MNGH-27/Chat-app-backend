const express = require('express')

// CONTROLLER
const roomController = require('./../../controller/room/room.controller')


// ROUTER
const router = express.Router()

router.post('/connectRoom', roomController.connectRoom)

module.exports = router
