// socket server
const { Server } = require('socket.io')

// ENUMS
const { SocketKeys } = require('./../core/enums')

// DB models
const { createNewMessage } = require('./../model/message/message.model')
const { getRoomById } = require('./../model/room/room.model')

function serverHandler (server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['POST', 'GET']
    }
  })

  // handle on connect to server
  io.on('connection', (socket) => {
    // create room with id as props as "roomId"
    socket.on(SocketKeys.JoinRoom, async (roomId) => {
      socket.join(roomId)
    })

    socket.on(SocketKeys.CreateMessage, async ({ context, senderId, receiverId, roomId }) => {
      try {
        const newMessage = await createNewMessage({ context, receiverId, roomId, senderId })

        socket.emit(SocketKeys.CheckNewMessage)
      } catch (error) {
        console.log('error in create message : ', error)
      }
    })


    socket.on('disconnect', () => {
    })
  })
}

module.exports = serverHandler
