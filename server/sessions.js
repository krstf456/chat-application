const sessions = []
const roomParameters = []

const addSession = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    // console.log(name, room)
    const session = { id, name, room }
    sessions.push(session)
    return { session }
}

<<<<<<< HEAD
=======
const addRoom = (room) => {
    const doesRoomExist = rooms.includes(room)
    if (doesRoomExist === false) {
        rooms.push(room)
    }
    // const index = rooms.indexOf(room)
    
    // let roomRemains    
    // if (index !== -1) {
    //         const roomRemains = rooms.splice(index, 1)[0]
    //        console.log(roomRemains, 'bug')
    //         //return [roomRemains]
    //     }

    return rooms
}

>>>>>>> master
const removeSession = (id) => {
    const index = sessions.findIndex((session) => session.id === id)
    const session = sessions.find((session) => session.id === id)
    if (index !== -1) {
        const sessionsRemain = sessions.splice(index, 1)[0]
        console.log(sessionsRemain)
        const roomsRemain = removeRoom(session.room)
        return [sessionsRemain, roomsRemain]
    }else{
        return [sessions, roomParameters]
    }
}

const removeRoom = (room) => {
    const checkIfEmpty = sessions.find((session) => session.room === room)
    console.log(checkIfEmpty, 'cp-2')
    if (checkIfEmpty === undefined) {
        
        const index = roomParameters.map(function (e) { return e.roomName; }).indexOf(room)

        // const index = rooms.indexOf(room);
        console.log(roomParameters, index, 'cp-4')
        if (index > -1) {
            roomParameters.splice(index, 1)
            console.log(roomParameters, 'cp-3')
        }
    }
    return roomParameters
}

const getSession = (id) => sessions.find((session) => session.id === id)

const getUsersInRoom = (room) => sessions.filter((session) => session.room === room)

const getRoomsWithUser = (name) => sessions.filter((session) => session.name === name)

module.exports = { addSession, removeSession, getSession, getUsersInRoom, getRoomsWithUser, sessions, roomParameters}