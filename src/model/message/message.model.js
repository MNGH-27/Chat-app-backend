// use Database Schema
const messageSchema = require('./message.schema')

async function createNewMessage ({ senderId, receiverId, roomId, context }) {
  return new Promise((resolve, reject) => {
    messageSchema
      .create({
        context,
        receiverId,
        roomId,
        senderId
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

async function getMessageListById ({ roomId }) {
  return new Promise((resolve, reject) => {
    messageSchema
      .find({
        roomId
      })
      .then((response) => {
        if (response.length > 0) {
          const modifiedData = response.map(item => {
            const {
              _id,
              context,
              receiverId,
              roomId,
              senderId
            } = item
            return {
              id: _id,
              context,
              receiverId,
              roomId,
              senderId
            } // Renaming _id to id and get just wanted items
          })

          // return result as response
          resolve(modifiedData)
        } else {
          resolve({
            messages: []
          })
        }
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

module.exports = {
  createNewMessage, getMessageListById
}
