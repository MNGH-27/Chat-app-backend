const generateOTP = require('../../utils/helper/generate-otp')

// use Database Schema
const forgetPasswordSchema = require('./forgetPassword.schema')

const checkForgetPasswordExists = ({ userId }) => {
  return new Promise((resolve, reject) =>
    // check if there is OTP for this email
    forgetPasswordSchema
      .findOne({
        userId
      })
      .then((response) => {
        // check if there is response
        if (response) {
          // there is response , we have created OTP for this email before
          reject({
            statusCode: 400,
            message: 'we sent OTP code for your email'
          })
        } else {
          resolve(response)
        }
      })
      .catch((error) =>
        reject({
          statusCode: 500,
          message: error
        })
      )
  )
}

const createForgetPassword = async ({ userId }) => {
  return new Promise((resolve, reject) =>
    // create new OTP for this current user
    forgetPasswordSchema
      .create({
        otpCode: generateOTP(),
        userId
      })
      .then((response) => {
        resolve(response)
      })
      .catch((error) =>
        reject({
          statusCode: 500,
          message: error
        })
      )
  )
}

const findForgetPassword = async ({ userId, otpCode }) => {
  return new Promise((resolve, reject) => {
    forgetPasswordSchema
      .findOne({
        userId,
        otpCode
      })
      .then((response) => {
        if (response) {
          // otp code found, both userId and otpCode match
          resolve(response)
        } else {
          // No otp code found with the given userId and otpCode
          reject({
            statusCode: 400,
            message: 'The otp code you sent is not correct'
          })
        }
      })
      .catch((err) => {
        reject({
          statusCode: 500,
          message: err
        })
      })
  })
}

module.exports = {
  findForgetPassword,
  createForgetPassword,
  checkForgetPasswordExists
}
