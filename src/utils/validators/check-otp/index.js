const Joi = require('joi')

const checkOtpSchema = Joi.object({
  otp: Joi.string().length(6).required().messages({
    'string.base': 'otp should be type of string',
    'string.empty': 'otp cannot be empty',
    'string.length': 'otp should have length of 6',
    'any.required': 'otp is a required field'
  }),
  userId: Joi.string().required().messages({
    'string.base': 'userId should be type of string',
    'string.empty': 'userId cannot be empty',
    'any.required': 'userId is a required field'
  })
})

module.exports = checkOtpSchema
