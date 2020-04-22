import React, { useEffect, useState, useContext } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import RoomNameHeader from '../RoomNameHeader/RoomNameHeader'
import Input from '../Input/Input'
import DisplayMsg from '../DisplayMsg/DisplayMsg'
import SideBar from '../SideBar/SideBar'
import { Box, ResponsiveContext} from 'grommet'

let socket
const ChatPage = ({ location }) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('')
    const ENDPOINT = 'localhost:5000'

    const size = useContext(ResponsiveContext)
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        console.log(name, room)
        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)
        console.log(socket)
        socket.emit('join', { name, room }, () => {
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
        socket.on("roomNames", ({ users }) => {
            setUsers(users);
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)
    return (
 
        <Box direction='row' fill='horizontal' height='100vh' gap='none' >
            <Box style={size === 'small' ? { display: 'none' } : { display: 'block' }}>
                <SideBar users={users} />
            </Box>
            <Box direction='column' fill='horizontal'>
                <RoomNameHeader roomName={room} />
                <DisplayMsg messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </Box>
        </Box>
    )
}

export default ChatPage