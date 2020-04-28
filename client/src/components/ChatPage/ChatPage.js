import React, { useEffect, useState, useContext } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import ChatBoxHeader from './ChatBoxHeader'
import Input from '../Input/Input'
import SideBar from './SideBar'
import { Box, ResponsiveContext, Footer } from 'grommet'

const socket = io.connect('localhost:5000')
const ChatPage = ({ user, roomName, setChat, submitForm }) => {
    const [name, setName] = useState(user)
    const [room, setRoom] = useState(roomName)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('')
    const [userRooms, setUserRooms] = useState('')
    const [allRooms, setAllRooms] = useState([])

    const size = useContext(ResponsiveContext)
    useEffect(() => {
        // const { name, room } = {user, roomName}
        // console.log(socket.server.eio.clients, 'test')
        // setName(user)
        // setRoom(roomName)
        console.log(name, room)
        socket.emit('join', { name, room }, () => {
        })
        // socket.on("disconnect", () => {
        //     console.log("Disconnected from server")
        // })
    }, [])

    // useEffect(() => {

    //     return () => {
    //       socket.emit("disconnect");
    //     };
    //   }, []);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);

        });
        socket.on("userNames", ({ users }) => {
            setUsers(users);
        })
        socket.on("userRooms", ({ userRooms }) => {
            setUserRooms(userRooms);
        })
        socket.on("allRooms", (allRooms) => {
            setAllRooms(allRooms);
            console.log(allRooms, 'all rooms')
        })

    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, room, () => setMessage(''))
        }
    }
    const logout = () => {
        setChat(false)
       socket.emit('leaveRoom')
    }


    return (
        <Box direction='row' fill='horizontal' height='100vh' gap='none' >
            <Box style={size === 'small' ? { display: 'none' } : { display: 'block' }}>
                <SideBar users={users} userRooms={userRooms} allRooms={allRooms} name={name} currentRoom={room} submitForm={submitForm} logout={logout} />
            </Box>
            <Box direction='column' fill='horizontal'>
                <Box>
                    <ChatBoxHeader
                        roomName={room}
                        messages={messages}
                        name={name}
                        logout={logout}
                    />
                </Box>
                <Footer justify='center'
                    alignSelf='center'>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </Footer>
            </Box>
        </Box>
    )
}

export default ChatPage