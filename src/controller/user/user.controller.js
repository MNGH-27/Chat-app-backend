const { findUserModel } = require('../../model/user/user.model')

async function findUser(req, res) {
  // Get the 'userName' query parameter from the URL
  const userName = req.query.userName

  // check if there is userName in this queryParams
  if (!userName) {
    return res.status(400).send({
      message: 'you have to send user name to check'
    })
  }

  try {
    // find user base on email user send
    const findUser = await findUserModel({ userName })

    return res.status(200).send(findUser)
  } catch (error) {
    // there is error while create new otp , send error to user
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}

async function getCurrentUser(req, res) {
  if (req.user) {
    return res.status(200).send({
      data: req.user
    })
  }

  return res.status(400).send({
    message: 'there is no user with this token'
  })
}

module.exports = {
  findUser,
  getCurrentUser
}
