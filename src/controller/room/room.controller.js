// MODEL
const { getUserById } = require('../../model/user/user.model')
const { findRoom, createRoom, getRoomById } = require('./../../model/room/room.model')

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

async function getRoomDetail (req, res) {
  // Get the 'roomId' query parameter from the URL
  const roomId = req.query.roomId

  // check if there is roomId in this queryParams
  if (!roomId) {
    return res.status(400).send({
      message: 'you have to send room id to check'
    })
  }

  try {
    const room = await getRoomById({ roomId })

    const receiver = await getUserById({ userId: room.receiverId !== req.user.id ? room.receiverId : req.user.id })

    res.status(200).send({
      data: {
        room,
        receiver,
        sender: req.user
      }
    })
  } catch (error) {
    // there is error while create new otp , send error to user
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}

module.exports = {
  connectRoom,
  getRoomDetail
}
