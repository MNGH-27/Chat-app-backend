const express = require('express')

// CONTROLLER
const userController = require('./../../controller/user/user.controller')

// ROUTER
const router = express.Router()

/**
 * * this method will get userName as it query
 */
router.get('/find-user', userController.findUser)
router.get('/current-user', userController.getCurrentUser)

module.exports = router
