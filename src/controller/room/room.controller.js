const Joi = require('joi')

// HELPER
const { extractErrorMessage } = require('../../helper/errorMessage')

// MODEL
const { findRoom, createRoom } = require('./../../model/room/room.model')

async function connectRoom (req, res) {
  const connectRoomSchema = Joi.object({
    receiverId: Joi.string().required()
  })

  const { error, value } = connectRoomSchema.validate(req.body, {
    abortEarly: false
  })


  if (error) {
    // return sepreted error to user
    return res
      .status(400)
      .send({ message: extractErrorMessage(error) })
  }


  try {
    const existedRoom = await findRoom({ receiverId: value.receiverId, senderId: req.user.id })

    // check if there is room
    if (existedRoom) {
      // there is room and send rooms detail
      return res.send({ data: { ...existedRoom }, message: 'connect to friend successfully' })
    }

    const newRoom = await createRoom({ receiverId: value.receiverId, senderId: req.user.id })
    return res.send({ data: { ...newRoom }, message: 'connect to friend successfully' })
  } catch (error) {
    // there was error while login user
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}


module.exports = {
  connectRoom
}
