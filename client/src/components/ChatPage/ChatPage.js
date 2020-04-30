import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client'
import ChatBoxHeader from './ChatBoxHeader'
import Input from '../Input/Input'
import SideBar from './SideBar'
import { Box, ResponsiveContext, Footer, Text} from 'grommet'


const socket = io.connect('localhost:5000')
const ChatPage = ({ user, roomName, setChat, submitForm}) => {
    const [name, setName] = useState(user)
    const [room, setRoom] = useState(roomName)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('')
    const [userRooms, setUserRooms] = useState('')
    const [allRooms, setAllRooms] = useState([])
    const [typingMessage, setTypingMessage] = useState('')

    const size = useContext(ResponsiveContext)
    useEffect(() => {

        console.log(name, room)
        socket.emit('join', { name, room }, () => {
        })
        socket.on("disconnect", () => {
            console.log("Disconnected from server")
        })

    }, [])

    // useEffect(() => {
    //     
    // }, []);

    useEffect(() => {
        socket.on('message', message => {
            setTypingMessage('')
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

        socket.on("stop typing", (data) => {
            console.log(data)
            setTypingMessage('')
        })

        socket.on("typing", (typist) => {
            if (typist !== name) {
                setTypingMessage(`${typist} is typing`)
            }
        })

    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        setTypingMessage('')
        //handleTyping(false)
        if (message) {
            socket.emit('sendMessage', message, room, () => setMessage(''))
        }
    }

    const logout = () => {
        socket.emit('leaveRoom')
    }

    const backToHomePage = () => {
        setChat(false)
        socket.emit('leaveRoom')
    }

    const handleTyping = (typing) => {
        if (typing) {
            socket.emit('typing', name)
        }
        else {
            socket.emit('stop typing', name)
        }
    }


    // console.log(typing)

    return (
        <Box direction='row' fill='horizontal' height='100vh' gap='none' >
            <Box style={size === 'small' ? { display: 'none' } : { display: 'block' }}>
                <SideBar users={users} 
                userRooms={userRooms} 
                allRooms={allRooms} 
                name={name} 
                currentRoom={room} 
                submitForm={submitForm} 
                logout={logout}/>
            </Box>
            <Box direction='column' fill='horizontal'>
                <Box>
                    <ChatBoxHeader
                        roomName={room}
                        messages={messages}
                        name={name}
                        logout={backToHomePage}
                    />
                </Box>
                <Text>{typingMessage}</Text>
                <Footer justify='center'
                    alignSelf='center'>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}
                        handleTyping={handleTyping}
                    />
                </Footer>
            </Box>
        </Box>
    )
}

export default ChatPage