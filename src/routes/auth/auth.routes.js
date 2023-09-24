const express = require('express')

// CONTROLLER
const authController = require('./../../controller/auth/auth.controller')

// MIDDLEWARE - handle profile upload
const { uploadProfileMiddleWare } = require('./../../middleware/upload.middleware')

// ROUTER
const router = express.Router()


router.post('/login', authController.Login)

router.post(
  '/signup',
  uploadProfileMiddleWare.single('profile'),
  authController.signup
)

router.post('/forgetPassword', authController.forgetPassword)

router.post('/checkOtp', authController.checkOPTCode)

router.post('/resetPassword', authController.resetPassword)


module.exports = router
