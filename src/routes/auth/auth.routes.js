const express = require('express')

// CONTROLLER
const authController = require('./../../controller/auth/auth.controller')

// MIDDLEWARE - handle profile upload
const { uploadProfileMiddleWare } = require('./../../middleware/upload-profile')
const Validator = require('./../../middleware/request-validator')

// ROUTER
const router = express.Router()


router.post('/login', Validator('loginSchema'), authController.Login)

router.post(
  '/signup',
  [
    uploadProfileMiddleWare.single('profile'),
    Validator('signupSchema')
  ],
  authController.signup
)

router.post('/forgetPassword', Validator('forgetPasswordSchema'), authController.forgetPassword)

router.post('/checkOtp', Validator('checkOtpSchema'), authController.checkOPTCode)

router.post('/resetPassword', Validator('resetPasswordSchema'), authController.resetPassword)


module.exports = router
