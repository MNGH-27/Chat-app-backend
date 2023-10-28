// MODEL
const { findRoom, createRoom } = require('./../../model/room/room.model')

async function connectRoom (req, res) {
  try {
    const existedRoom = await findRoom({ receiverId: req.body.receiverId, senderId: req.user.id })

    // check if there is room
    if (existedRoom) {
      // there is room and send rooms detail
      return res.send({ data: { ...existedRoom }, message: 'connect to friend successfully' })
    }

    const newRoom = await createRoom({ receiverId: req.body.receiverId, senderId: req.user.id })
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
