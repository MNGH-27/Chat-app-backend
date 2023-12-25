const express = require('express')

// CONTROLLER
const messageController = require('./../../controller/message/message.controller')

// ROUTER
const router = express.Router()

router.get('/list', messageController.getMessageList)

module.exports = router
