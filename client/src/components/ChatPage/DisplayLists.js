import React from 'react'
import { StatusGoodSmall } from 'grommet-icons';
import { Box, Text } from 'grommet';

const DisplayLists = ({ displayItem, changeChat }) => {
    return (
        <Box pad='small' gap="none" overflow="auto" style={{ maxHeight: '400px' }}>
            <Box gap="xsmall">
                <Text color="dark-3">
                    {
                        displayItem.length > 0
                            ? (
                                <Box>
                                    {
                                        displayItem.map((room) => (
                                            <Text key={room} onClick={() => { changeChat(room) }}>
                                                <StatusGoodSmall color='status-ok' size='small' />
                                                <strong> {room}</strong>
                                            </Text>
                                        ))
                                    }
                                </Box>
                            )
                            : (
                                <Box>
                                    <Text>
                                        No rooms available
                                 </Text>
                                </Box>
                            )
                    }
                </Text>
            </Box>
        </Box>
    )
}

export default DisplayLists