// Packages
const crypto = require('crypto')

// use Database Schema
const userSchema = require('./user.schema')

// helper
const generateFileLink = require('../../utils/helper/generate-file-link')
const generateJwt = require('../../utils/helper/generate-jwt')
async function createNewUser({ userName, password, email, profile }) {
  // create password for user =>
  const { hash, salt } = setPassword(password)

  // request for save the new user
  return await new Promise((resolve, reject) =>
    userSchema
      .create({
        userName,
        password,
        email,
        profile,
        salt,
        hash
      })
      .then((response) => {
        // create token for created user
        const token = generateJwt({
          id: response._id,
          userName: response.userName,
          email: response.email,
          role: response.role
        })

        // return result as response
        resolve({
          data: {
            id: response._id,
            userName: response.userName,
            email: response.email,
            profile: generateFileLink(response.userName, response.profile)
          },
          token
        })
      })
      .catch((err) => {
        // catch error code
        if (err.code === 11000) {
          reject({
            statusCode: 422,
            message: `field ${Object.keys(err.keyPattern)[0]} is duplicated`
          })
        }

        reject({
          statusCode: 500,
          message: err
        })
      })
  )
}

async function loginUser({ userName, password }) {
  return await new Promise((resolve, reject) =>
    userSchema
      .findOne({ userName, password })
      .then((result) => {
        if (result) {
          // create token for created user
          const token = generateJwt({
            id: result._id,
            userName: result.userName,
            email: result.email,
            role: result.role
          })

          resolve({
            token,
            data: {
              id: result._id,
              userName: result.userName,
              email: result.email,
              profile: generateFileLink(result.profile)
            }
          })
        } else {
          reject({
            statusCode: 400,
            // eslint-disable-next-line quotes
            message: "can't find user with this data"
          })
        }
      })
      .catch((err) => {
        reject({
          statusCode: 500,
          message: err
        })
      })
  )
}

async function findUserModel(searchField) {
  return await new Promise((resolve, reject) =>
    userSchema
      .findOne({ ...searchField })
      .then((result) => {
        if (result) {
          resolve({
            id: result._id,
            userName: result.userName,
            email: result.email,
            profile: generateFileLink(result.profile)
          })
        } else {
          reject({
            statusCode: 400,
            message: 'there is no any user with this email'
          })
        }
      })
      .catch((err) => {
        reject({
          statusCode: 500,
          message: err
        })
      })
  )
}

async function getUserById({ userId }) {
  return await new Promise((resolve, reject) =>
    userSchema
      .findOne({ _id: userId })
      .then((result) => {
        if (result) {
          resolve({
            id: result._id,
            userName: result.userName,
            email: result.email,
            profile: generateFileLink(result.profile)
          })
        } else {
          reject({
            statusCode: 400,
            message: 'there is no any user with this id'
          })
        }
      })
      .catch((err) => {
        reject({
          statusCode: 500,
          message: err
        })
      })
  )
}

async function resetUserPassword({ userId, newPassword }) {
  return await new Promise((resolve, reject) => {
    userSchema
      .findOneAndUpdate({ _id: userId }, { password: newPassword }, { new: true })
      .then((response) => {
        // check if there is user with this userId
        if (response) {
          // there is user send users this response
          // create token for created user
          const token = generateJwt({
            id: response._id,
            userName: response.userName,
            email: response.email,
            role: response.role
          })

          // return result as response
          resolve({
            data: {
              id: response._id,
              userName: response.userName,
              email: response.email,
              profile: generateFileLink(response.profile)
            },
            token
          })
        } else {
          // there wasn't any user with this data send error
          reject({
            statusCode: 400,
            message: 'there is not user with this id'
          })
        }
      })
      .catch((err) => {
        // error occure while get data from database
        reject({
          statusCode: 500,
          message: err
        })
      })
  })
}

// create password with hash and salt
function setPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  return {
    salt,
    hash
  }
}

module.exports = {
  createNewUser,
  loginUser,
  findUserModel,
  resetUserPassword,
  getUserById
}
