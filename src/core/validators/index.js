const loginSchema = require('./login/login.schema')
const signupSchema = require('./signup/signup.schema')
const forgetPasswordSchema = require('./forget-password/forget-password.schema')
const checkOtpSchema = require('./check-otp/check-otp.schema')
const resetPasswordSchema = require('./reset-password/reset-password.schema')
const connectRoomSchema = require('./connect-room/connect-room.schema')
module.exports = {
  resetPasswordSchema,
  checkOtpSchema,
  loginSchema,
  signupSchema,
  forgetPasswordSchema,
  connectRoomSchema
}
