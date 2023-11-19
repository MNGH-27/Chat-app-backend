const loginSchema = require('./login')
const signupSchema = require('./signup')
const forgetPasswordSchema = require('./forget-password')
const checkOtpSchema = require('./check-otp')
const resetPasswordSchema = require('./reset-password')
const connectRoomSchema = require('./connect-room')
module.exports = {
  resetPasswordSchema,
  checkOtpSchema,
  loginSchema,
  signupSchema,
  forgetPasswordSchema,
  connectRoomSchema
}
