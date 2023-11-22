const Joi = require('joi')

const resetPasswordSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'userId should be type of string',
    'string.empty': 'userId cannot be empty',
    'any.required': 'userId is a required field'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password should be type of string',
    'string.empty': 'password cannot be empty',
    'string.min': 'password should have a minimum length of 6',
    'any.required': 'password is a required field'
  }),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.base': 'repeatPassword should be type of string',
    'string.empty': 'repeatPassword cannot be empty',
    'string.min': 'repeatPassword should have a minimum length of 6',
    'any.required': 'repeatPassword is a required field',
    'any.only': 'repeatPassword must be the same as password'
  })
})

module.exports = resetPasswordSchema
