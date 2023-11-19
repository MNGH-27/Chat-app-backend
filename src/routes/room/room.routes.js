const express = require('express')

// CONTROLLER
const roomController = require('./../../controller/room/room.controller')

// MIDDLEWARE
const { requestValidatorMiddleWare } = require('./../../middleware')


// ROUTER
const router = express.Router()

router.post('/connectRoom', requestValidatorMiddleWare('connectRoomSchema'), roomController.connectRoom)
router.get('/room_detail', roomController.getRoomDetail)
module.exports = router
