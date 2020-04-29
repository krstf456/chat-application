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

const cors = require('cors');

const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')

const { addSession, removeSession, getSession, getUsersInRoom, getRoomsWithUser, addRoom, sessions } = require('./sessions')

app.use(cors());
app.use(express.json())
app.use(cookieSession({
    secret: 'aVeryS3cr3tK3y',
    maxAge: 1000 * 10, // 10s
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
}))




const updateSessions = (session) => {
    roomsWithUser = getRoomsWithUser(session.name)
    sessions.forEach(element => {
        if (element.name === session.name) {
            io.sockets.connected[element.id].emit('userRooms', { room: session.room, userRooms: roomsWithUser })
        }
    });
}
