import React from 'react'
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
            >
                Send
            </Box>
        </Box>
    )
}

export default Input
