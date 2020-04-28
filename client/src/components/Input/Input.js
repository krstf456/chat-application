import React from 'react'
import './Input.css'
import { Box, Button, TextInput } from 'grommet'
import { Socket } from 'net'



const Input = ({ message, setMessage, sendMessage, emitTyping }) => {
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
                        emitTyping(true)
                    } else {
                        emitTyping(false)
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
            >

                <Button  onClick={(event) => sendMessage(event)}>Send</Button>  
            </Box>
                
            
        </Box>
        
      
    )
}

export default Input
