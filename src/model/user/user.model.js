// Packages
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

// use Database Schema
const userSchema = require('./user.schema')


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
          response.id,
          response.userName,
          response.email,
          response.role
        )

        // return result as response
        resolve({
          id: response._id,
          userName: response.userName,
          email: response.email,
          token
        })
      })
      .catch((err) => {
        // catch error if there would be error
        reject(err)
      })
  )
}


async function loginUser ({ userName, password }) {
  return await new Promise((resolve, reject) =>
    userSchema
      .findOne({ userName, password })
      .then(result => {
        if (result) {
          resolve({
            userName: result.userName,
            token: result.token,
            email: result.email
          })
        } else {
          reject(result)
        }
      }).catch((err) => {
        reject(err)
      })
  )
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
  createNewUser, loginUser
}
