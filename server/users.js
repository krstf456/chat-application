const users = []
const rooms = []


const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) => user.name === name)
    
    // if (!existingUser) {
    //     user.userRooms.push(room)
    //     users.push(user)
    // }
    // else {
    //     const existingRoom = existingUser.rooms.find((element) => element === room)
    //     if (!existingRoom) {
    //         existingUser.rooms.push(room)
    //     }
    // }
    const user = { id, name, room }
    users.push(user)
    console.log(users, 'test 1')
    return { user }
}

const addRoom = (room) => {
    const existingRooms = rooms.find((element) => element === room)
    if(!existingRooms){
        rooms.push[room]
    }
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
const getRooms = (name) => users.filter((user) => user.name === name)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRooms, addRoom }