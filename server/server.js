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
    // console.log(socket.rooms)
    socket.on('join', ({ name, room }, callback) => {
        
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) return callback(error)
      
        
        socket.emit('message', { user: 'admin', text: `Hey ${user.name}, welcome to ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })
        socket.join(user.room)
        io.to(user.room).emit('userNames', { room: user.room, users: getUsersInRoom(user.room) })
        
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        callback()
    })

    // io.on('connection', (socket) => {
    //     socket.join('room 237', () => {
    //       let rooms = Object.keys(socket.rooms);
    //       console.log(rooms); // [ <socket.id>, 'room 237' ]
    //     });
    //   });

    // when the client disconnects, we broadcast it to others
    socket.on('disconnect', () => {
        console.log(`User has left`)
        const user = removeUser(socket.id);
        if (user) {
            console.log(user.name, 'has left')
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })
            io.to(user.room).emit('userNames', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        console.log('im typing')
        socket.broadcast.to(user.room).emit('typing', { user: user.name })
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        console.log('i stopped typing')
        socket.broadcast.to(user.room).emit('stop typing', { user: user.name })
    });
})

app.use(router)
server.listen(port, () => console.log(`Server is listening on ${port}`))