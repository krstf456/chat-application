import React from 'react'
import './Input.css'
import { Box, Button, FormField, TextInput } from 'grommet'


const Input = ({ message, setMessage, sendMessage }) => {
    return (
        

        <Box 
       direction='row'
       
       >
            <Box
            
            width='medium'
            >
                <TextInput 
                value={message} 
                placeholder='Enter you message'
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} />

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
        
        // <from>
        //     <input
        //         className='input'
        //         type='text'
        //         placeholder='Type your message here...'
        //         value={message}
        //         onChange={(event) => setMessage(event.target.value)}
        //         onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
        //     />
        //     <button className='sendButton' onClick={(event) => sendMessage(event)}>Send</button>
        // </from>
    )
}

export default Input
