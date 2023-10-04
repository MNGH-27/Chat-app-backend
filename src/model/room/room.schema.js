const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  senderId: {
    type: String,
    require: true
  },
  receiverId: {
    type: String,
    require: true
  }
})


const Room = mongoose.model('Room', roomSchema)

module.exports = Room
