// MODEL
const { getMessageListById } = require('./../../model/message/message.model')

async function getMessageList (req, res) {
  // Get the 'roomId' query parameter from the URL
  const roomId = req.query.roomId

  // check if there is roomId in this queryParams
  if (!roomId) {
    return res.status(400).send({
      message: 'you have to send room id to check'
    })
  }

  try {
    const messageList = await getMessageListById({ roomId })

    res.status(200).send({
      data: [...messageList]
    })
  } catch (error) {
    // there is error while create new otp , send error to user
    return res.status(error.statusCode).send({
      message: error.message
    })
  }
}

module.exports = {
  getMessageList
}
