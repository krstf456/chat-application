import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'

let socket
const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        console.log(name, room)
        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)
        console.log(socket)
        socket.emit('join', { name, room }, () => {
            
        })

        return ()=>{
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])


    return (
        <div>
            <h1>Test Chat</h1>
        </div>
    )
}

export default Chat