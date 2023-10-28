const Joi = require('joi')

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required()
})

module.exports = forgetPasswordSchema
