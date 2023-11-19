const Joi = require('joi')

const resetPasswordSchema = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'repeatPassword must be the same as password'
    })
})

module.exports = resetPasswordSchema
