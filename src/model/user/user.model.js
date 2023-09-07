// Packages
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

// use Database Schema
const userSchema = require('./user.schema')
const { resolve } = require('path')
const { rejects } = require('assert')

async function createNewUser (name, password, email) {
  // create password for user =>
  const { hash, salt } = setPassword(password)

  // request for save the new user
  return await new Promise((resolve, reject) =>
    userSchema
      .create({
        name,
        password,
        email,
        salt,
        hash
      })
      .then((response) => {
        // create token for created user
        const token = generateJwt(
          response.id,
          response.name,
          response.email,
          response.role
        )

        // return result as response
        resolve({
          id: response._id,
          name: response.name,
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
      .findOne({ name: userName, password })
      .then(result => {
        if (result) {
          resolve({
            name: result.name,
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
function generateJwt (id, email, name, role) {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign(
    {
      id: id,
      email: email,
      name: name,
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
