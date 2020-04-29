const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const port = process.env.port || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Allow cors between 3000 and 5000
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
app.get('/rooms', (req, res) => {
    res.json(roomParameters)
})

//1. Creates a new room if the room does not exist
//2. If rooms exits checks rooms status
//3. If locked checks password
app.post('/rooms', async (req, res) => {
    const roomParam = roomParameters.find(roomParam => roomParam.roomName === req.body.roomName)
    if (roomParam) { //room with same name exists
        if (roomParam.status === req.body.status) {
            if (roomParam.status === false) {
                return res.status(200).json('Enter room success')
            }
            else {
                if (!await bcrypt.compare(req.body.password, roomParam.password)) {
                    return res.status(401).json({ error: 'Wrong room name or password' })
                } else {
                    return res.status(200).json('Enter room success')
                }
            }
        }
        return res.status(401).json({ error: 'Room exists with different locked status' })
    } else {//room is new
        newRoom = {
            roomName: req.body.roomName,
            status: req.body.status
        }
        if (req.body.password) {
            newRoom.password = await bcrypt.hash(req.body.password, 10)
        }
        roomParameters.push(newRoom)
        return res.status(200).json('Enter room success')
    }
}
)

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
        console.log(socket.id)

        if (error) return callback(error)
        // when the client joins, broadcast it to others and send welcome to the client 
        socket.emit('message', { session: 'admin', text: `Hey ${session.name}, welcome to ${session.room}` })
        socket.broadcast.to(session.room).emit('message', { session: 'admin', text: `${session.name} has joined` })
        socket.join(session.room)
        console.log(io.sockets.adapter.rooms, 'checkpoint')
        console.log(Object.keys(socket.rooms), 'checkpoint-2')
        // console.log(io.sockets.adapter.rooms['1'], 'checkpoint-3')
        const rooms = roomParameters.map(element => { const room = { roomName: element.roomName, status: element.status }; return room })
        // console.log(rooms, 'all rooms')
        sessions.forEach(element => {
            io.sockets.connected[element.id].emit('allRooms', rooms)
        });

        updateSessions(session)

        io.to(session.room).emit('userNames', { room: session.room, users: getUsersInRoom(session.room) })
        callback()
    })

    socket.on('sendMessage', (message, room, callback) => {
        const session = getSession(socket.id)
        io.to(room).emit('message', { session: session.name, text: message })
        callback()
    })

    // when the client leaves, broadcast it to others
    socket.on('leaveRoom', () => {

        console.log(`User has left`)
        const [session, roomParameters] = removeSession(socket.id);

        console.log(session, roomParameters, 'cp-6')

        const rooms = roomParameters.map(element => { const room = { roomName: element.roomName, status: element.status }; return room })
        if (session) {
            console.log(session.name, 'has left')

            socket.broadcast.to(session.room).emit('message', { session: 'admin', text: `${session.name} has left` })
            io.to(session.room).emit('userNames', { room: session.room, users: getUsersInRoom(session.room) });
            sessions.forEach(element => {
                io.sockets.connected[element.id].emit('allRooms', rooms)
            });
            updateSessions(session)
            socket.leave(session.room)
        }
    })
    // when the client leaves, broadcast it to others
    socket.on('disconnect', () => {

        console.log(`User has left`)
        const [session, roomParameters] = removeSession(socket.id);

        console.log(session, roomParameters, 'cp-6')

        const rooms = roomParameters.map(element => { const room = { roomName: element.roomName, status: element.status }; return room })
        if (session) {
            console.log(session.name, 'has left')

            socket.broadcast.to(session.room).emit('message', { session: 'admin', text: `${session.name} has left` })
            io.to(session.room).emit('userNames', { room: session.room, users: getUsersInRoom(session.room) });
            sessions.forEach(element => {
                io.sockets.connected[element.id].emit('allRooms', rooms)
            });
            updateSessions(session)
            socket.leave(session.room)
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

