const crypto = require('crypto')

function generateOTP () {
  // Generate a random buffer of bytes
  const randomBytes = crypto.randomBytes(6)

  // Convert the buffer to a hexadecimal string
  const otp = randomBytes.toString('hex')

  // Extract the first '6' characters
  return otp.slice(0, 6)
}

module.exports = { generateOTP }
