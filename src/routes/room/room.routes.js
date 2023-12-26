const express = require('express')

// CONTROLLER
const roomController = require('./../../controller/room/room.controller')

// MIDDLEWARE
const requestValidatorMiddleWare = require('./../../middleware/request-validator')

// ROUTER
const router = express.Router()

router.post(
  '/connect-room',
  requestValidatorMiddleWare('connectRoomSchema'),
  roomController.connectRoom
)
router.get('/room-detail', roomController.getRoomDetail)
router.get('/connected-users', roomController.getConnectedUsersList)
router.get('/connected-users/:roomId', roomController.getRoomLastMessage)

module.exports = router
