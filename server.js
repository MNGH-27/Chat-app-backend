require('dotenv').config()

const http = require('http')

// app
const app = require('./app')

// require socket io file
const socketHandler = require('./src/socketIO/socket')

// define port
const PORT = process.env.PORT || 5000

// create server on app
const server = http.createServer(app)

// define socket
socketHandler(server)


// start mongoDB
require('./src/config/database/mongoDB')

// function of starting backend project
async function startServer () {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('server is run on PORT', PORT)
  })
}

// start server  . . .
startServer()

// . . . . .
