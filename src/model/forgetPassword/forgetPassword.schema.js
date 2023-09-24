const mongoose = require('mongoose')

const forgetPasswordSchema = new mongoose.Schema({
  otpCode: {
    type: String,
    require: true
  },

  userId: {
    type: String,
    require: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create an index with the "120s" option
forgetPasswordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 })

const ForgetPassword = mongoose.model('ForgetPassword', forgetPasswordSchema)

module.exports = ForgetPassword
