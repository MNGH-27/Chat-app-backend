const Joi = require('joi')

const connectRoomSchema = Joi.object({
  receiverId: Joi.string().required()
})


module.exports = connectRoomSchema
