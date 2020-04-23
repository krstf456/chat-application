import React from 'react'
import { Box, Text } from "grommet";

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <Box pad='small'>
                <Box alignSelf='end' pad='small' border={{ color: 'brand', size: 'small' }} background={{ color: 'light-6', opacity: true }} width='small' round>
                    <Text >{text}</Text>
                    <Text alignSelf='end' color='brand'>{trimmedName}</Text>
                </Box>
            </Box>
            )
            : (
                <Box pad='small'>
                    <Box alignSelf='start' pad='small' border={{ color: 'brand', size: 'small' }} background={{ color: 'brand', opacity: true }}  width='small' round>
                        <Text >{text}</Text>
                        <Text alignSelf='end' color='brand'>{user}</Text>
                    </Box>
                </Box>
            )

    )
}

export default Message
