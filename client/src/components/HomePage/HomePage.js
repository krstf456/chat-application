import React from 'react'
import { useState } from 'react'
import LoginPage from './LoginPage'
import ChatPage from '../ChatPage/ChatPage'

const HomePage = () => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [chat, setChat] = useState(false)

    const submitForm = (value) => {
        console.log(value)
        if(value.haveAlias){

        }
        else {
            setName(value.name)
            setRoom(value.room)
            setChat(true)
        }

    }

    const displayPage = () => {
        let displayPage = <LoginPage submitForm={submitForm} />
        if (chat) {

            displayPage = <ChatPage user={name} roomName={room} />
        }
        return displayPage
    }

    return (
        <>{displayPage()}</>
    )
}

export default HomePage