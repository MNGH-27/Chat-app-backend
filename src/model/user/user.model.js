// Packages
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

// use Database Schema
const userSchema = require('./user.schema')

// helper
const generateFileLink = require('../../core/helper/generate-file-link')


async function createNewUser ({ userName, password, email, profile }) {
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
        const token = generateJwt(
          response._id,
          response.userName,
          response.email,
          response.role
        )

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
      })
      .catch((err) => {
        // catch error code
        if (err.code === 11000) {
          reject({
            statusCode: 400,
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


async function loginUser ({ userName, password }) {
  return await new Promise((resolve, reject) =>
    userSchema
      .findOne({ userName, password })
      .then(result => {
        if (result) {
          // create token for created user
          const token = generateJwt(
            result._id,
            result.userName,
            result.email,
            result.role
          )

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
            message: 'can\'t find user with this data'
          })
        }
      }).catch((err) => {
        reject({
          statusCode: 500,
          message: err
        })
      })
  )
}


async function findUserModel (searchField) {
  return await new Promise((resolve, reject) =>
    userSchema
      .findOne({ ...searchField })
      .then(result => {
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
      }).catch((err) => {
        reject({
          statusCode: 500,
          message: err
        })
      })
  )
}

async function resetUserPassword ({ userId, newPassword }) {
  return await new Promise((resolve, reject) => {
    userSchema
      .findOneAndUpdate(
        { _id: userId },
        { password: newPassword },
        { new: true })
      .then((response) => {
        // check if there is user with this userId
        if (response) {
          // there is user send users this response
          // create token for created user
          const token = generateJwt(
            response.id,
            response.userName,
            response.email,
            response.role
          )

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


// generate JWT with data => {id , email , name , role}
function generateJwt (id, email, userName, role) {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign(
    {
      id: id,
      email: email,
      userName: userName,
      role: role,
      exp: parseInt(expiry.getTime() / 1000)
    },
    // JWT secret Key from .env file
    process.env.JWT_SECRET
  )
}

// create password with hash and salt
function setPassword (password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  return {
    salt,
    hash
  }
}


module.exports = {
  createNewUser, loginUser, findUserModel, resetUserPassword
}
