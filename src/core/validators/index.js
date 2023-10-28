const loginSchema = require('./login/login.schema')
const signupSchema = require('./signup/signup.schema')
const forgetPasswordSchema = require('./forget-password/forget-password.schema')
const checkOtpSchema = require('./check-otp/check-otp.schema')
module.exports = {
  checkOtpSchema,
  loginSchema,
  signupSchema,
  forgetPasswordSchema
}
