const Joi = require('joi')
const { extractErrorMessage } = require('./../../helper/errorMessage')

const { loginUser, createNewUser } = require('./../../model/user/user.model')

async function Login (req, res) {
  const userSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required().min(6)
  })


  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false
  })

  if (error) {
    // return sepreted error to user
    return res
      .status(400)
      .send({ message: extractErrorMessage(error) })
  }

  try {
    // generate instance of class of user
    const loginData = await loginUser({
      ...value
    })

    // user created successfuly => send users information for frontend
    return res.status(201).send({
      ...loginData
    })
  } catch (error) {
    // check if there is error
    if (!error) {
      // there is no any error message , we don't have user with this kind of data
      return res.status(400).send({
        message: 'there is no any user with this username and password'
      })
    }

    return res.status(500).send({
      error
    })
  }
}


async function signup (req, res, next) {
  // check if there is file
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' })
  }

  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().required().min(6)
  })


  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false
  })

  if (error) {
    // return sepreted error to user
    return res
      .status(400)
      .send({ message: extractErrorMessage(error) })
  }

  try {
    // generate new user
    const newUser = await createNewUser({
      ...value,
      profile: req.file.filename
    })

    // user created successfuly => send users information for frontend
    return res.status(201).send({
      ...newUser,
      profile: `${req.protocol}://${req.get('host')}/${req.file.filename}`
    })
  } catch (error) {
    // check if there is error
    if (error.code === 11000) {
      // there is no any error message , we don't have user with this kind of data
      return res.status(400).send({
        message: 'your data is duplicated'
      })
    }

    return res.status(500).send({
      error
    })
  }
}

module.exports = {
  Login, signup
}
