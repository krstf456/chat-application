import React, { useState } from 'react';
import { Unlock, Lock, FormSubtract, FormAdd, User, StatusGoodSmall } from 'grommet-icons';
import { Accordion, AccordionPanel, Box, Heading, Text, ThemeContext } from 'grommet';
import backgroundImage from '../../Assets/background.jpg'

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

const SideBar = ({ users, userRooms }) => {
    // const [users, ]
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
                                        <strong>Room Names</strong>
                                    </Text>
                                </Box>
                            </Box>
                        </RichPanel>
                        <RichPanel icon={<Unlock color="brand" />} label="Unlocked Rooms">
                            <Box pad='small' gap="none" overflow="auto" style={{ maxHeight: '400px' }}>
                                <Box gap="xsmall">
                                    <Text color="dark-3">
                                    {/* {
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
                                    } */}
                                    </Text>
                                </Box>
                            </Box>
                        </RichPanel>
                        <RichPanel icon={<Unlock color="brand" />} label="Your Rooms">
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
                        <RichPanel icon={<User color="brand" />} label="Members">
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