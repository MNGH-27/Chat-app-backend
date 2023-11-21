const nodemailer = require('nodemailer')

// TEMPLATE
const { forgetPasswordTemplate } = require('./../../utils/template')

// MODEL
const { loginUser, createNewUser, findUserModel, resetUserPassword } = require('./../../model/user/user.model')
const { createForgetPassword, findForgetPassword } = require('./../../model/forgetPassword/forgetPassword.model')

async function Login(req, res) {
  try {
    // generate instance of class of user
    const loginData = await loginUser({
      ...req.body
    })

    // user created successfuly => send users information for frontend
    return res.status(201).send({
      ...loginData
    })
  } catch (error) {
    // there was error while login user
    return res.status(error.statusCode).send({
      message: error.message.toString()
    })
  }
}

async function signup(req, res) {
  try {
    // generate new user
    const newUser = await createNewUser({
      ...req.body,
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

async function forgetPassword(req, res) {
  try {
    // find user base on email user send
    const findUser = await findUserModel({ email: req.body.email })

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
      to: req.body.email,
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
          data: {
            userId: findUser.id,
            email: req.body.email
          },
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

async function checkOPTCode(req, res) {
  try {
    const otpCode = await findForgetPassword({ otpCode: req.body.otp, userId: req.body.userId })

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

async function resetPassword(req, res) {
  try {
    const newUserPassword = await resetUserPassword({ newPassword: req.body.password, userId: req.body.userId })

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
  Login,
  signup,
  forgetPassword,
  checkOPTCode,
  resetPassword
}
