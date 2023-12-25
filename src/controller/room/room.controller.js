// MODEL
const { getLastMessage, getRoomsListLastMessage } = require('../../model/message/message.model')
const { listeners } = require('../../model/message/message.schema')
const { getUserById, getUsersListWithIdList } = require('../../model/user/user.model')
const { findRoom, createRoom, getRoomById, getUserRooms } = require('./../../model/room/room.model')

async function connectRoom(req, res) {
  try {
    const existedRoom = await findRoom({ receiverId: req.body.receiverId, senderId: req.user.id })

    // check if there is room
    if (existedRoom) {
      // there is room and send rooms detail
      return res
        .status(201)
        .send({ data: { ...existedRoom }, message: 'connect to friend successfully' })
    }

    const newRoom = await createRoom({ receiverId: req.body.receiverId, senderId: req.user.id })
    return res.status(201).send({ data: { ...newRoom }, message: 'connect to friend successfully' })
  } catch (error) {
    // there was error while login user
    return res.status(error.status).send({
      message: error.message
    })
  }
}

async function getRoomDetail(req, res) {
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

    const receiver = await getUserById({
      // check user and set receiver base of user send this request
      userId: room.receiverId !== req.user.id ? room.receiverId : room.senderId
    })

    res.status(200).send({
      data: {
        room,
        receiver,
        sender: req.user
      }
    })
  } catch (error) {
    // there is error while create new otp , send error to user
    return res.status(error.status).send({
      message: error.message
    })
  }
}

async function getConnectedUsersList(req, res) {
  try {
    const room = await getUserRooms({ userId: req.user.id })

    let friendsList = []

    // generate base object structure for room
    room.forEach((singleRoom) => {
      friendsList.push({
        friendId:
          singleRoom.receiverId !== req.user.id ? singleRoom.receiverId : singleRoom.senderId,
        roomId: singleRoom._id
      })
    })

    // get list of friend
    const friendsDataList = await getUsersListWithIdList({
      usersList: friendsList.map((item) => item.friendId)
    })

    // get list of last Messages
    const lastMessagesDataList = await getRoomsListLastMessage({
      roomIdList: friendsList.map((item) => item.roomId)
    })

    friendsList = friendsList.map((item) => {
      return {
        user: {
          ...friendsDataList.find(({ id }) => item.friendId.toString() === id.toString())
        },
        message: {
          ...lastMessagesDataList.find(({ roomId }) => item.roomId.toString() === roomId.toString())
        }
      }
    })

    res.status(200).send({
      data: friendsList
    })
  } catch (error) {
    // there is error while create new otp , send error to user
    return res.status(error.status).send({
      message: error.message
    })
  }
}

module.exports = {
  connectRoom,
  getRoomDetail,
  getConnectedUsersList
}
