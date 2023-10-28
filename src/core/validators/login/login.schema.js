const Joi = require('joi')

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required().min(6)
})

module.exports = loginSchema
