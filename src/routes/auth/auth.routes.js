const express = require('express')

// CONTROLLER
const authController = require('./../../controller/auth/auth.controller')

// MIDDLEWARE - handle profile upload
const requestValidatorMiddleWare = require('./../../middleware/request-validator')
const uploadProfileMiddleWare = require('./../../middleware/upload-profile')

// ROUTER
const router = express.Router()

router.post('/login', requestValidatorMiddleWare('loginSchema'), authController.Login)

router.post(
  '/signup',
  [uploadProfileMiddleWare.single('profile'), requestValidatorMiddleWare('signupSchema')],
  authController.signup
)

router.post(
  '/forget-password',
  requestValidatorMiddleWare('forgetPasswordSchema'),
  authController.forgetPassword
)

router.post('/check-otp', requestValidatorMiddleWare('checkOtpSchema'), authController.checkOPTCode)

router.post(
  '/reset-password',
  requestValidatorMiddleWare('resetPasswordSchema'),
  authController.resetPassword
)

module.exports = router
