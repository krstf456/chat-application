const rooms = []

const addRoom = ({ id, name, room}) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const room = { id, name, room }

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


const getRoomsForUser = (id) => rooms.filter((room) => user.name === name)

module.exports = { addRoom, removeRoom, getUsersInRoom}