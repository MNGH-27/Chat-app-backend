// use Database Schema
const { getRoomsLatestMessages } = require('../../utils/helper/get-rooms-latest-messages')
const messageSchema = require('./message.schema')

async function createNewMessage({ senderId, receiverId, roomId, context }) {
  return new Promise((resolve, reject) => {
    messageSchema
      .create({
        context,
        receiverId,
        roomId,
        senderId,
        createdAt: new Date()
      })
      .then((response) => {
        // return result as response
        resolve({
          senderId: response.senderId,
          receiverId: response.receiverId,
          id: response._id,
          roomId: response.roomId,
          context: response.context
        })
      })
      .catch((err) => {
        // catch error if there would be error
        reject({
          status: 500,
          message: err
        })
      })
  })
}

async function getMessageListById({ roomId }) {
  return new Promise((resolve, reject) => {
    messageSchema
      .find({
        roomId
      })
      .then((response) => {
        // return result as response
        resolve({
          messages: response.map(({ _id, context, receiverId, roomId, senderId, createdAt }) => ({
            id: _id,
            context,
            receiverId,
            roomId,
            senderId,
            createdAt
          })) // Renaming _id to id and get just wanted items
        })
      })
      .catch((err) => {
        // catch error if there would be error
        reject({
          status: 500,
          message: err
        })
      })
  })
}

async function getRoomsListLastMessage({ roomIdList }) {
  return new Promise((resolve, reject) =>
    messageSchema
      .find({
        roomId: { $in: [...roomIdList] }
      })
      .then((response) => {
        resolve(
          getRoomsLatestMessages(
            response.map(({ context, createdAt, roomId }) => ({ context, createdAt, roomId }))
          )
        )
      })
      .catch((err) => {
        // catch error if there would be error
        reject({
          status: 500,
          message: err
        })
      })
  )
}

module.exports = {
  createNewMessage,
  getRoomsListLastMessage,
  getMessageListById
}
