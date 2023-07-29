require('dotenv').config()
const express = require('express')
const cors = require('cors')
const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer)
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')

const chatSocket = require('./sockets/chatSocket')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Рассмотреть вариант на создание пространство имен
// const chatNamespace = io.of('/chatNamespace');
// chatSocket(chatNamespace);
chatSocket(io)

app.use(errorHandler)
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    // httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start();