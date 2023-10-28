const Joi = require('joi')

const checkOtpSchema = Joi.object({
  otp: Joi.string().length(6).required(),
  userId: Joi.string().required()
})


module.exports = checkOtpSchema
