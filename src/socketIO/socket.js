// socket server
const { Server } = require('socket.io')

// ENUMS
const { SocketKeys } = require('./../core/enums')

// DB models
const { createNewMessage } = require('./../model/message/message.model')

function serverHandler (server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['POST', 'GET']
    }
  })

  // handle on connect to server
  io.on('connection', (socket) => {
    let roomId

    // create room with id as props as "_roomId"
    socket.on(SocketKeys.JoinRoom, async (_roomId) => {
      roomId = _roomId
      socket.join(roomId)
    })

    socket.on(SocketKeys.CreateMessage, async ({ context, senderId, receiverId, roomId }) => {
      try {
        await createNewMessage({ context, receiverId, roomId, senderId })

        // Emit to all clients in the room except the sender
        io.to(roomId).emit(SocketKeys.CheckNewMessage)
      } catch (error) {
        console.log('error in create message : ', error)
      }
    })


    socket.on('disconnect', () => {
    })
  })
}

module.exports = serverHandler
