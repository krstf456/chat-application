import React from 'react'
<<<<<<< HEAD
import { Box, TextInput } from 'grommet'

const Input = ({ message, setMessage, sendMessage, handleTyping}) => {
    return (
        <Box
            direction='row'
        >
            <Box
                width='medium'
            >
                <TextInput
                    value={message}
                    placeholder='Enter your message'
                    onChange={(event) => {
                        setMessage(event.target.value)
                        if (event.target.value.length > 0) {
                            handleTyping(true)
                        } else {
                            handleTyping(false)
                        }
                    }}
                    onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} />

            </Box>
            <Box
                justify='center'
                width='small'
                align='center'
                border='all'
                background='brand'
                onClick={(event) => sendMessage(event)}
=======
import './Input.css'
import { Box, Button, TextInput } from 'grommet'
import { Socket } from 'net'



const Input = ({ message, setMessage, sendMessage, setTyping }) => {
    return (
        

        <Box 
       direction='row'
       >
            <Box
            width='medium'
            >
                <TextInput 
                value={message} 
                placeholder='Enter your message'
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                onChange={(event) => {
                    setMessage(event.target.value)
                    if(event.target.value.length > 0) {
                        setTyping(true)
                    } else {
                        setTyping(false)
                    }
                }}
                 />

            </Box>
            <Box 
            justify='center'
            width='small'
            align='center'
            border='all'
            background='brand'
>>>>>>> master
            >
                Send
            </Box>
        </Box>
<<<<<<< HEAD
=======
        
      
>>>>>>> master
    )
}

export default Input
