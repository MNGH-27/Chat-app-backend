const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  context: {
    type: String,
    require: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    require: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const message = mongoose.model('message', messageSchema)

module.exports = message
