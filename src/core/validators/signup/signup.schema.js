const Joi = require('joi')

const singupSchema = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().required(),
  password: Joi.string().required().min(6)
})

module.exports = singupSchema
