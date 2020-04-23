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
                <Box justify='end' direction='row'>
                    <Text>{trimmedName} : </Text>
                    <Box>
                        <Text>{text}</Text>
                    </Box>
                </Box>
            )
            : (
                <Box alignContent='end'
                background='blue'>
                    <Text>{text}</Text>
                    <Text>{user}</Text>
                </Box>
            )

    )
}

export default Message
