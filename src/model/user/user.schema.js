const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // this will container profile's name
  profile: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: 'user'
  },

  isOnline: {
    type: Boolean
  },

  lastSeen: {
    type: Date
  },

  /**
   * password saving with hash and salt
   */
  hash: String,
  salt: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
