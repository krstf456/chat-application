const sessions = []
const rooms = []

const addSession = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const session = { id, name, room }
    sessions.push(session)
    return { session }
}

const addRoom = (room) => {
    const doesRoomExist = rooms.includes(room)
    if (doesRoomExist === false) {
        rooms.push(room)
    }
    return rooms
}

const removeSession = (id) => {
    const index = sessions.findIndex((session) => session.id === id)
    const session = sessions.find((session) => session.id === id)
    console.log(session.room, 'cp-1')
    if (index !== -1) {
        const sessionsRemain = sessions.splice(index, 1)[0]
        const roomsRemain = removeRoom(session.room)
        return [sessionsRemain, roomsRemain]
    }

}

const removeRoom = (room) => {
    const checkIfEmpty = sessions.find((session) => session.room === room)
    console.log(checkIfEmpty, 'cp-2')
    if (checkIfEmpty === undefined) {
        const index = rooms.indexOf(room);
        console.log(rooms, index, 'cp-4')
        if (index > -1) {
            rooms.splice(index, 1)
            console.log(rooms, 'cp-3')
        }
    }
    return rooms
}

const getSession = (id) => sessions.find((session) => session.id === id)

const getUsersInRoom = (room) => sessions.filter((session) => session.room === room)

const getRoomsWithUser = (name) => sessions.filter((session) => session.name === name)

module.exports = { addSession, removeSession, getSession, getUsersInRoom, getRoomsWithUser, addRoom, sessions }