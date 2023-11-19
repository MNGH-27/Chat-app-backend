const express = require('express')

// CONTROLLER
const authController = require('./../../controller/auth/auth.controller')

// MIDDLEWARE - handle profile upload
const { uploadProfileMiddleWare, requestValidatorMiddleWare } = require('./../../middleware')

// ROUTER
const router = express.Router()


router.post('/login', requestValidatorMiddleWare('loginSchema'), authController.Login)

router.post(
  '/signup',
  [
    uploadProfileMiddleWare.single('profile'),
    requestValidatorMiddleWare('signupSchema')
  ],
  authController.signup
)

router.post('/forgetPassword', requestValidatorMiddleWare('forgetPasswordSchema'), authController.forgetPassword)

router.post('/checkOtp', requestValidatorMiddleWare('checkOtpSchema'), authController.checkOPTCode)

router.post('/resetPassword', requestValidatorMiddleWare('resetPasswordSchema'), authController.resetPassword)


module.exports = router
