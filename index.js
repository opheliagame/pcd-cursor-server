const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
            .use(express.json())
            .use(cors())
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"]
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('new user', (user) => {
    console.log(`${user} has joined`)
    io.emit('new user', user)
  })

  socket.on('user move', (pos) => {
    io.emit('user move', pos)
  })
})

const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`listening on port: ${port}`)
})