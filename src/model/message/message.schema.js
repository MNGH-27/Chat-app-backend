const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  context: {
    type: String,
    require: true
  },
  roomId: {
    type: String,
    require: true
  },
  senderId: {
    type: String,
    require: true
  },
  receiverId: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    require: true
  }
})

const message = mongoose.model('message', messageSchema)

module.exports = message
