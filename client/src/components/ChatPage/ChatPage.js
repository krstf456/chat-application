import React, { useEffect, useState, useContext } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import ChatBoxHeader from './ChatBox/ChatBoxHeader'
import Input from '../Input/Input'

import SideBar from './SideBar'
import { Box, ResponsiveContext, Footer } from 'grommet'

let socket
const ChatPage = ({ location }) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState([])
    
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('')
    const [userRooms, setUserRooms] = useState('')
    const [allRooms, setAllRooms] = useState([])
    const ENDPOINT = 'localhost:5000'

    const size = useContext(ResponsiveContext)
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {
        })
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
        socket.on("userTyping", (msg) => {
            console.log(msg)
        } )
        socket.on("userNames", ({ users }) => {
            setUsers(users);
        })
        socket.on("userRooms", ({ userRooms }) => {
            setUserRooms(userRooms);
        })
        socket.on("allRooms", (allRooms) => {
            setAllRooms(allRooms);
            // console.log(allRooms, 'all rooms')
        })
    }, [])

    function joinRoom(room) {

            socket.emit('join', { name, room }, () => {})
            console.log(`joined the ${room}`)
        
    }

 
    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    const emitTyping = (typing) => {
        const msg = name + "is typing.."
        if(typing) {
            socket.emit("userTyping", msg, room.name)
        }
        else {
            socket.emit("userTyping", "", room.name)
        }
    }

    return (

        <Box direction='row' fill='horizontal' height='100vh' gap='none' >
            <Box style={size === 'small' ? { display: 'none' } : { display: 'block' }}>
                <SideBar users={users} userRooms={userRooms} allRooms={allRooms} joinRoom={joinRoom} name={name} />
            </Box>
            <Box direction='column' fill='horizontal'>
                <Box>
                    <ChatBoxHeader
                        roomName={room}
                        messages={messages}
                        name={name}
                        
                    />
                </Box>
                <Footer justify='center'
                    alignSelf='center'>
                    <Input 
                     message={message}
                     setMessage={setMessage}
                     sendMessage={sendMessage} 
                     emitTyping={emitTyping} 
                     />
                </Footer>
            </Box>
        </Box>
    )
}

export default ChatPage