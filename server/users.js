const sessions = []
const rooms = []

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const user = { id, name, room }
    sessions.push(user)
    console.log(sessions, 'test')
    return { user }
}

const addRoom = (room) => {
    const doesRoomExist = rooms.includes(room)
    if (doesRoomExist === false) {
        rooms.push(room)
    }
    return rooms
}

const removeUser = (id) => {
    const index = sessions.findIndex((user) => user.id === id)
    console.log('checkpoint')
    if (index !== -1) {
        const usersRemain = sessions.splice(index, 1)[0]
        return usersRemain
    }
    removeRoom(id)
}

const removeRoom = (id) => {
    const userRoom = sessions.find((user) => user.id === id)
    console.log(userRoom, 'userRoom')
    //const usersList = getUsersInRoom(userRoom.room)
    // if (usersList === null ) {
    //     const index = rooms.indexOf(userRoom.room);
    //     if (index > -1) {
    //        const roomsRemain =  rooms.splice(index, 1)[0]
    //        return roomsRemain
    //     }
    // }


}

const getUser = (id) => sessions.find((user) => user.id === id)



const getUsersInRoom = (room) => sessions.filter((user) => user.room === room)
const getRoomsWithUser = (name) => sessions.filter((user) => user.name === name)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRoomsWithUser, addRoom, removeRoom, sessions}