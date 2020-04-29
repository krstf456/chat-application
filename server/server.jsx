const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.port || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Allow cors between 3000--client and 5000--server
const cors = require('cors');

const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')

const { addSession, removeSession, getSession, getUsersInRoom, getRoomsWithUser, sessions, roomParameters } = require('./sessions')


//Delay server from restarting
io.eio.pingTimeout = 120000; // 2 minutes
// io.eio.pingInterval = 5000;  // 5 seconds

app.use(cors());
app.use(express.json())
app.use(cookieSession({
    secret: 'aVeryS3cr3tK3y',
    maxAge: 1000 * 10, // 10s
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
}))

//Test if working 
// app.get('/rooms', (req, res) => {
//     res.json(roomParameters)
// })

//1. Creates a new room if the room does not exist
//2. If rooms exits checks rooms status
//3. If locked checks password


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
         // when the client joins, broadcast it to others and send welcome to the client 
        socket.emit('message', { session: 'admin', text: `Hey ${session.name}, welcome to ${session.room}` })
        socket.broadcast.to(session.room).emit('message', { session: 'admin', text: `${session.name} has joined` })
        socket.join(session.room)

        const rooms = roomParameters.map(element => {const room = {roomName: element.roomName, status: element.status}; return room})
        console.log(rooms, 'all rooms')
        sessions.forEach(element => {
            io.sockets.connected[element.id].emit('allRooms', rooms)
        });

        updateSessions(session)

        io.to(session.room).emit('userNames', { room: session.room, users: getUsersInRoom(session.room) })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const session = getSession(socket.id)
        io.to(session.room).emit('message', { session: session.name, text: message })
        callback()
    })

    // when the client disconnects, broadcast it to others


app.use(router)
server.listen(port, () => console.log(`Server is listening on ${port}`))

