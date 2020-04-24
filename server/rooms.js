const rooms = []

const addRoom = ({ id, name, room, password}) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const room = { id, name, room, password }

    rooms.push(room)

    return { room }
}

const removeRoom = (id) => {
    const index = rooms.findIndex((room) => room.id === id)
    if (index !== -1) {
        rooms.splice(index, 1)[0]
    }

}

// const getUser = (id) => users.find((user) => user.id === id)


// const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addRoom, removeRoom}