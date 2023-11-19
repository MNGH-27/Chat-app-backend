const { generateOTP } = require('../../utils/helper')

// use Database Schema
const forgetPasswordSchema = require('./forgetPassword.schema')

const createForgetPassword = async ({ userId }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // check if there is OTP for this email
    await forgetPasswordSchema
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
        }
      })
      .catch((error) => reject({
        statusCode: 500,
        message: error
      }))

    // create new OTP for this current user
    await forgetPasswordSchema
      .create({
        otpCode: generateOTP(),
        userId
      })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => reject({
        statusCode: 500,
        message: error
      }))
  })
}

const findForgetPassword = async ({ userId, otpCode }) => {
  return new Promise((resolve, reject) => {
    forgetPasswordSchema.findOne({
      userId, otpCode
    }).then((response) => {
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
    }).catch((err) => {
      reject({
        statusCode: 500,
        message: err
      })
    })
  })
}

module.exports = {
  findForgetPassword,
  createForgetPassword
}
