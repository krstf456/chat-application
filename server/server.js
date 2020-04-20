const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.port || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('new connection established')
    socket.on('join', ({ name, room }, callback) => {
        
        console.log(name, room)
       
    })




    socket.on('disconnect', () => {
        console.log(`User has left`)
    })
})

app.use(router)
server.listen(port, () => console.log(`Server is listening on ${port}`))