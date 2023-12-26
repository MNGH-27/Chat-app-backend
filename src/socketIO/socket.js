/* eslint-disable no-console */
// socket server
const { Server } = require('socket.io')

// ENUMS
const { SocketKeys } = require('./../utils/enums/socket-keys')

// DB models
const { createNewMessage } = require('./../model/message/message.model')
const { setUserOnline, setUserOffline } = require('../model/user/user.model')

function serverHandler(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['POST', 'GET']
    }
  })

  // handle on connect to server
  io.on('connection', async (socket) => {
    const currentUserId = socket.handshake.query.currentUser

    let roomId

    // check if there is id in "currentUserId"
    if (currentUserId) {
      try {
        // set user as online to show other connected persons
        await setUserOnline({ userId: currentUserId })

        // send alert to other users that one user's status is changed
        io.emit(SocketKeys.UsersStatusChange)
      } catch (error) {
        console.log('error in set user as onLine : ', error)
      }
    }

    // create room with id as props as "_roomId"
    socket.on(SocketKeys.JoinRoom, async (_roomId) => {
      roomId = _roomId
      socket.join(roomId)
    })

    // create message handler
    socket.on(SocketKeys.CreateMessage, async ({ context, senderId, receiverId, roomId }) => {
      try {
        // create message base on users data
        await createNewMessage({ context, receiverId, roomId, senderId })

        // Emit to all clients in the room except the sender
        io.to(roomId).emit(SocketKeys.CheckNewMessage)
      } catch (error) {
        console.log('error in create message : ', error)
      }
    })

    socket.on('disconnect', async () => {
      try {
        // set user as online to show other connected persons
        await setUserOffline({ userId: currentUserId })

        // use is disconnected => send other user that status is changed
        io.emit(SocketKeys.UsersStatusChange)
      } catch (error) {
        console.log('error in set user as offLine : ', error)
      }
    })
  })
}

module.exports = serverHandler
