// use Database Schema
const roomSchema = require('./room.schema')

async function findRoom ({ senderId, receiverId }) {
  return new Promise((resolve, reject) => {
    roomSchema.findOne({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })
      .then((response) => {
        if (response === null) {
          // there is no room with this ids so return null to create one
          resolve(response)
        } else {
          // send rooms data
          resolve({
            id: response._id,
            senderId: response.senderId,
            receiverId: response.receiverId,
            createAt: response.createAt
          })
        }
      })
      .catch((err) => {
        // there is error while finding room
        reject({
          status: 500,
          message: err
        })
      })
  })
}

async function createRoom ({ senderId, receiverId }) {
  return await new Promise((resolve, reject) => {
    roomSchema
      .create({
        senderId,
        receiverId
      })
      .then((response) => {
        // return result as response
        resolve({
          senderId: response.senderId,
          receiverId: response.receiverId,
          id: response._id,
          createAt: response.createAt
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

async function getRoomById ({ roomId }) {
  return await new Promise((resolve, reject) => {
    roomSchema
      .findOne({
        _id: roomId
      })
      .then((response) => {
        if (response) {
          // return result as response
          resolve({
            senderId: response.senderId,
            receiverId: response.receiverId,
            id: response._id,
            createAt: response.createAt
          })
        }

        reject({
          status: 400,
          message: 'there is no room with this id'
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


module.exports = {
  findRoom, createRoom, getRoomById
}
