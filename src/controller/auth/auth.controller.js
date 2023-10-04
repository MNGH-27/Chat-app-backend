const Joi = require('joi')
const nodemailer = require('nodemailer')

// TEMPLATE
const { forgetPasswordTemplate } = require('./../../template/forgetPassword.template')

// HELPER
const { extractErrorMessage } = require('./../../helper/errorMessage')

// MODEL
const { loginUser, createNewUser, findUserModel, resetUserPassword } = require('./../../model/user/user.model')
const { createForgetPassword, findForgetPassword } = require('./../../model/forgetPassword/forgetPassword.model')

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
    // there was error while login user
    return res.status(error.statusCode).send({
      message: error.message
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
      ...newUser
    })
  } catch (error) {
    // send error
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}

async function forgetPassword (req, res) {
  const passwordSchema = Joi.object({
    email: Joi.string().email().required()
  })

  const { error, value } = passwordSchema.validate(req.body, {
    abortEarly: false
  })


  if (error) {
    // return sepreted error to user
    return res
      .status(400)
      .send({ message: extractErrorMessage(error) })
  }

  try {
    // find user base on email user send
    const findUser = await findUserModel({ email: value.email })

    // create new OTP base on user we fetch from data base
    const newOTP = await createForgetPassword({ userId: findUser.id })

    // create transporter to send email to user with otp code
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'mnq13800831@gmail.com',
        pass: process.env.EMAIL_PASSWORD // Use the app password you generated
      }
    })

    // create option object to send email to user
    const mailOptions = {
      from: 'mnq13800831@gmail.com',
      to: 'mohsenouri27@gmail.com',
      subject: 'Forget Password',
      html: forgetPasswordTemplate(newOTP.otpCode) // html body
    }

    // send email to user
    transporter.sendMail(mailOptions, (error) => {
      // check if there is error in send email
      if (error) {
        // there is error, send failed message to user
        return res.status(500).send({
          message: 'failed in send code for your email'
        })
      } else {
        // there is not any error send response to user
        return res.status(201).send({
          userId: findUser.id,
          message: 'otp send to your email successfully'
        })
      }
    })
  } catch (error) {
    // there is error while create new otp , send error to user
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}

async function checkOPTCode (req, res) {
  const passwordSchema = Joi.object({
    otp: Joi.string().length(6).required(),
    userId: Joi.string().required()
  })

  const { error, value } = passwordSchema.validate(req.body, {
    abortEarly: false
  })


  if (error) {
    // return sepreted error to user
    return res
      .status(400)
      .send({ message: extractErrorMessage(error) })
  }

  try {
    const otpCode = await findForgetPassword({ otpCode: value.otp, userId: value.userId })

    // send finded otpCode for user as response code 201
    return res.status(201).send({
      userId: otpCode.userId,
      message: 'otp code is correct reset your password'
    })
  } catch (error) {
    // there is error while create new otp , send error to user
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}


async function resetPassword (req, res) {
  const passwordSchema = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'repeatPassword must be the same as password'
      })
  })

  const { error, value } = passwordSchema.validate(req.body, {
    abortEarly: false
  })


  if (error) {
    // return sepreted error to user
    return res
      .status(400)
      .send({ message: extractErrorMessage(error) })
  }

  try {
    const newUserPassword = await resetUserPassword({ newPassword: value.password, userId: value.userId })

    return res.status(201).send({
      message: 'your password changed successfully',
      data: newUserPassword
    })
  } catch (error) {
  // there is error while create new otp , send error to user
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}

module.exports = {
  Login, signup, forgetPassword, checkOPTCode, resetPassword
}

