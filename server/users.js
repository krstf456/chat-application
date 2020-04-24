const users = []
const rooms = []

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) => user.name === name)
    if (existingUser) {
        rooms.push(Object.keys(socket.rooms))
     }
    const user = { id, name, room, rooms }

    users.push(user)

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        const userRemoved = users.splice(index, 1)[0]
        return userRemoved
    }

}

const getUser = (id) => users.find((user) => user.id === id)


const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom}