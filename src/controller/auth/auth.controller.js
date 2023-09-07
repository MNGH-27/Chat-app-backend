const Joi = require('joi')
const { extractErrorMessage } = require('./../../helper/errorMessage')

const { loginUser } = require('./../../model/user/user.model')

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
    const newUser = await loginUser({
      ...value
    })

    // user created successfuly => send users information for frontend
    return res.status(201).send({
      ...newUser
    })
  } catch (error) {
    // check if there is error
    if (!error) {
      console.log('error : ', error)
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


function signup (req, res) {

}

module.exports = {
  Login
}
