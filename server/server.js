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
app.use(cors());

const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')

const roomParameters = []

// Parse request body as json
app.use(express.json())

app.use(cookieSession({
    secret: 'aVeryS3cr3tK3y',
    maxAge: 1000 * 10, // 10s
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
}))

app.get('/rooms', (req, res) => {
    res.json(roomParameters)
})

// Register a new user
app.post('/rooms', async (req, res) => {
    const roomParam = roomParameters.find(roomParam => roomParam.roomName === req.body.roomName)
    if (roomParam) {
        if (roomParam.status === req.body.status) {
            if (roomParam.status === false) {
                return res.send('Enter room success')
            }
            else if (roomParam.status === true) {
                if (!await bcrypt.compare(req.body.password, roomParam.password)) {
                    return res.status(401).json('Wrong room name or password')
                }

                return res.send('Enter room success')
            }
        }
        return res.status(401).json('Room exists with different locked status')
    }

    if (req.body.password === undefined) {
        roomParameters.push({
            roomName: req.body.roomName,
            status: req.body.status,
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    roomParameters.push({
        roomName: req.body.roomName,
        password: hashedPassword,
        status: req.body.status,
    })
    res.status(201).json(hashedPassword)
})

// Attemp to login a user
app.post('/login', async (req, res) => {
    // Check if username & password is correct
    const user = users.find(user => user.name === req.body.name)
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).json('Wrong roomname or password')
    }

    // Check if user already is logged in
    if (req.session.username) {
        return res.json('You are already logged in')
    }

    // Create session
    req.session.username = user.name
    req.session.role = 'admin'

    // Send a response
    res.send('Succesful login')
})

// Logout
app.delete('/logout', (req, res) => {
    // Check if user already is logged out
    if (!req.session.username) {
        return res.status(400).json('You are already logged out')
    }

    // Remove the session and send a response
    req.session = null
    res.send('You are now logged out!')
})




























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
        rooms = addRoom(session.room)
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