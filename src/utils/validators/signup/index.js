const Joi = require('joi')

const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'email should be type of string',
    'string.empty': 'email cannot be empty',
    'string.email': 'enter email correctly',
    'any.required': 'email is a required field'
  }),
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

module.exports = signupSchema
