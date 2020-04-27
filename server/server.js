const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.port || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
io.eio.pingTimeout = 120000; // 2 minutes
// io.eio.pingInterval = 5000;  // 5 seconds

const { addSession, removeSession, getSession, getUsersInRoom, getRoomsWithUser, addRoom, sessions } = require('./sessions')

const updateSessions = (session) => {
    roomsWithUser = getRoomsWithUser(session.name)
    sessions.forEach(element => {
        if (element.name === session.name) {
            io.sockets.connected[element.id].emit('userRooms', { room: session.room, userRooms: roomsWithUser })
        }
    });
}


io.on('connection', (socket) => {
    console.log('new connection established')

    socket.on('join', ({ name, room }, callback) => {

        const { error, session } = addSession({ id: socket.id, name, room })
        if (error) return callback(error)

        socket.emit('message', { session: 'admin', text: `Hey ${session.name}, welcome to ${session.room}` })
        socket.broadcast.to(session.room).emit('message', { session: 'admin', text: `${session.name} has joined` })
        socket.join(session.room)
        //const [rooms, roomRemains] = addRoom(session.room)
        const rooms = addRoom(session.room)
        sessions.forEach(element => {
            io.sockets.connected[element.id].emit('allRooms', rooms)
        });

        updateSessions(session)

        io.to(session.room).emit('userNames', { room: session.room, users: getUsersInRoom(session.room) })

        if(typeof callback === "function") callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const session = getSession(socket.id)
        io.to(session.room).emit('message', { session: session.name, text: message })
        callback()
    })

    // when the client disconnects, we broadcast it to others
    socket.on('disconnect', () => {
        console.log(`User has left`)
        const [session, rooms] = removeSession(socket.id);
        console.log(session, rooms, 'cp-6')
        if (session) {
            console.log(session.name, 'has left')
            socket.broadcast.to(session.room).emit('message', { session: 'admin', text: `${session.name} has left` })
            io.to(session.room).emit('userNames', { room: session.room, users: getUsersInRoom(session.room) });
            sessions.forEach(element => {
                io.sockets.connected[element.id].emit('allRooms', rooms)
            });
            updateSessions(session)
        }
    })

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        console.log('im typing')
        socket.broadcast.to(session.room).emit('typing', { session: session.name })
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        console.log('i stopped typing')
        socket.broadcast.to(session.room).emit('stop typing', { session: session.name })
    });
})

app.use(router)
server.listen(port, () => console.log(`Server is listening on ${port}`))