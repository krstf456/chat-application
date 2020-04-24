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

    if (index !== -1) {
        const sessionsRemain = sessions.splice(index, 1)[0]
        return sessionsRemain
    }
    removeRoom(id)
}

const removeRoom = (id) => {
    const userRoom = sessions.find((user) => user.id === id)
    // console.log(userRoom, 'userRoom')
    //const usersList = getUsersInRoom(userRoom.room)
    // if (usersList === null ) {
    //     const index = rooms.indexOf(userRoom.room);
    //     if (index > -1) {
    //        const roomsRemain =  rooms.splice(index, 1)[0]
    //        return roomsRemain
    //     }
    // }


}

const getSession = (id) => sessions.find((session) => session.id === id)



const getUsersInRoom = (room) => sessions.filter((session) => session.room === room)
const getRoomsWithUser = (name) => sessions.filter((session) => session.name === name)

module.exports = { addSession, removeSession, getSession, getUsersInRoom, getRoomsWithUser, addRoom, removeRoom, sessions}