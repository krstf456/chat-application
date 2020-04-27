import React from 'react'
import { Box, Button, TextInput } from 'grommet'

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
                    placeholder='Enter your message'
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} />

            </Box>
            <Box
                justify='center'
                width='small'
                align='center'
                border='all'
                background='brand'
                onClick={(event) => sendMessage(event)}
            >
                Send
            </Box>
        </Box>
    )
}

export default Input
