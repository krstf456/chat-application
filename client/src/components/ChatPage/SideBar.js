import React, { useState } from 'react';
import { Unlock, Lock, FormSubtract, FormAdd, Group, StatusGoodSmall, ChatOption, Chat } from 'grommet-icons';
import { Accordion, AccordionPanel, Box, Heading, Text, ThemeContext } from 'grommet';
import backgroundImage from '../../Assets/background.jpg'
import { Link } from 'react-router-dom'

const richAccordionTheme = {
    accordion: {
        icons: {
            collapse: FormSubtract,
            expand: FormAdd,
        },
    },
}

const RichPanel = ({ children, icon, label }) => {
    const [hovering, setHovering] = useState(false);


    const renderPanelTitle = () => (
        <Box direction="row" align="center" gap="small" pad={{ horizontal: 'small' }}>
            {icon}
            <Heading level={5} color={hovering ? 'dark-1' : 'dark-3'}>
                {label}
            </Heading>
        </Box>
    );

    return (
        <AccordionPanel
            label={renderPanelTitle()}
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
        >
            {children}
        </AccordionPanel>
    );
};

const SideBar = ({ users, userRooms, allRooms, submitForm, name, currentRoom }) => {
    const changeChat = (room) => {
        if (room === currentRoom) {
            console.log('same room')
        }
        else {
            const values =
                { lockedStatus: false, name: name, room: room }

            console.log('here')
            submitForm(values)
        }
    }

    const lockedRooms = allRooms.filter(element => element.status === true).map(element => element.roomName)
    const unlockedRooms = allRooms.filter(element => element.status === false).map(element => element.roomName)
    console.log(unlockedRooms, lockedRooms)
    return (
        <Box fill direction="row">
            <Box basis="medium" border={{ side: 'right', color: 'brand', size: 'medium' }}>
                <Box
                    flex={true}
                    border="bottom"
                    background={{
                        "color": "light-1",
                        "dark": false,
                        "opacity": true,
                        "position": "bottom",
                        "repeat": "no-repeat",
                        "size": "cover",
                        "image": `url(${backgroundImage})`
                    }}
                    as="header"
                    pad={{ horizontal: 'small' }}
                >
                    <Heading level={2} alignSelf='center'>
                        <strong>Chatify</strong>
                    </Heading>
                </Box>
                <ThemeContext.Extend value={richAccordionTheme}>
                    <Accordion>
                        <RichPanel icon={<Lock color="brand" />} label="Locked Rooms">
                            <Box pad='small' gap="none" overflow="auto" style={{ maxHeight: '400px' }}>
                                <Box gap="xsmall">
                                    <Text color="dark-3">
                                        {
                                            lockedRooms.length > 0
                                                ? (
                                                    <Box>

                                                        {
                                                            lockedRooms.map((room) => (
                                                                <Text key={room}>
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
                        </RichPanel>
                        <RichPanel icon={<Unlock color="brand" />} label="Unlocked Rooms">
                            <Box pad='small' gap="none" overflow="auto" style={{ maxHeight: '400px' }}>
                                <Box gap="xsmall">
                                    <Text color="dark-3">
                                        {
                                            unlockedRooms.length > 0
                                                ? (
                                                    <Box>

                                                        {
                                                            unlockedRooms.map((room) => (

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
                        </RichPanel>
                        <RichPanel icon={<ChatOption color="brand" />} label="Your Rooms">
                            <Box pad='small' gap="none" overflow="auto" style={{ maxHeight: '400px' }}>
                                <Text color="dark-3">
                                    {
                                        userRooms
                                            ? (
                                                <Box>
                                                    {
                                                        userRooms.map(({ room }) => (
                                                            <Text key={room}>
                                                                <StatusGoodSmall color='status-ok' size='small' />
                                                                <strong> {room}</strong>
                                                            </Text>
                                                        ))
                                                    }
                                                </Box>
                                            )
                                            : null
                                    }
                                </Text>
                            </Box>
                        </RichPanel>
                        <RichPanel icon={<Group color="brand" />} label="Members">
                            <Box pad='small' gap="none" overflow="auto" style={{ maxHeight: '400px' }}>
                                {
                                    users
                                        ? (
                                            <Box>
                                                {
                                                    users.map(({ name }) => (
                                                        <Text key={name}>
                                                            <StatusGoodSmall color='status-ok' size='small' />
                                                            <strong> {name}</strong>
                                                        </Text>
                                                    ))
                                                }
                                            </Box>
                                        )
                                        : null
                                }

                            </Box>
                        </RichPanel>
                    </Accordion>
                </ThemeContext.Extend>
            </Box>
        </Box>
    );
};

export default SideBar