const Joi = require('joi')

const loginSchema = Joi.object({
  userName: Joi.string().required().messages({
    'string.base': 'userName should be type of string',
    'string.empty': 'userName cannot be empty',
    'any.required': 'userName is a required field'
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': 'password should be type of string',
    'string.empty': 'password cannot be empty',
    'string.min': 'password should have a minimum length of 6',
    'any.required': 'password is a required field'
  })
})

module.exports = loginSchema
