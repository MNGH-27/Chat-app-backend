const express = require('express')

// CONTROLLER
const userController = require('./../../controller/user/user.controller')


// ROUTER
const router = express.Router()


/**
 * * this method will get userName as it query
 */
router.get('/finduser', userController.findUser)
router.get('/current_user', userController.getCurrentUser)


module.exports = router
