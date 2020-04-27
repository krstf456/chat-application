const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.port || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

io.on('connection', (socket) => {
    console.log('new connection established')

    socket.on('join', ({ name, room, password }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) return callback(error)

        // Need acccess to the array of rooms here
        // let rooms = []

        let foundRoom = rooms.find((room) => room.name == name)

        if(foundRoom.password == password) {
            // Join the chat room here
        } else {
            // Send a error message here 
        }
        socket.emit('message', { user: 'admin', text: `Hey ${user.name}, welcome to ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })
        socket.join(user.room)
        io.to(user.room).emit('roomNames', { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        callback()
    })


})

app.use(router)
server.listen(port, () => console.log(`Server is listening on ${port}`))