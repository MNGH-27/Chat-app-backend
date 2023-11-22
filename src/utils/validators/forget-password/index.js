const Joi = require('joi')

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'email should be type of string',
    'string.empty': 'email cannot be empty',
    'string.email': 'enter email correctly',
    'any.required': 'email is a required field'
  })
})

module.exports = forgetPasswordSchema
