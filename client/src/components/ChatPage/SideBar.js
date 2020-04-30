<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Unlock, Lock, FormSubtract, FormAdd, Group, StatusGoodSmall, ChatOption } from 'grommet-icons';
import { Accordion, AccordionPanel, Box, Heading, Text, ThemeContext, Layer, Button } from 'grommet';
=======
import React, { useState } from 'react';
import { Unlock, Lock, FormSubtract, FormAdd, Group, StatusGoodSmall, ChatOption, Chat} from 'grommet-icons';
import { Accordion, AccordionPanel, Box, Heading, Text, ThemeContext } from 'grommet';
import { Link } from 'react-router-dom'
>>>>>>> master
import backgroundImage from '../../Assets/background.jpg'
import DisplayLists from './DisplayLists'
import {FormClose, StatusWarning} from "grommet-icons";

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

<<<<<<< HEAD
const SideBar = ({ users, userRooms, allRooms, submitForm, name, currentRoom, logout }) => {
    const [proceed, setProceed] = useState(undefined);
    const [lockedValues, setLockedValues] = useState('');
    const [error, setError] = useState(false);
    const onClose = () => setError(undefined);
    const [errorMessage, setErrorMessage] = useState('')
    const changeChat = (room) => {
        if (room === currentRoom) {
            console.log('same room')
        }
        else {
            const values =
                { lockedStatus: false, name: name, room: room }
            console.log('here')
            logout()
            submitForm(values)
        }
    }
=======
const SideBar = ({ users, userRooms, allRooms, joinRoom, name }) => {
>>>>>>> master

    const getPassword = (room) => {
        if (room === currentRoom) {
            console.log('same room')
        }
        else {
            const password = prompt("Please enter password", "password")
            authenticatePassword(room, password)
            setLockedValues({ lockedStatus: true, name: name, room: room, password: password })
        }
    }
    const authenticatePassword = async (room, password) => {
        setError(false)
        try {
            fetch('http://localhost:5000/switch', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomName: room,
                    password: password,
                })
            }).then(function (response) {
                return response.json();
            }).then(function (parsedJson) {
                console.log(parsedJson)
                if (parsedJson.error) {
                    console.log('This is the parsed json', parsedJson);
                    setError(true);
                    setProceed(false)
                    setErrorMessage(parsedJson.error)
                }
                else {
                    console.log('ok')
                    console.log(name, room, 'test534')
                    setProceed(true)
                }
            })
        } catch (error) {
            console.log(error, 'test')
        }
    }

    useEffect(() => {

        if (proceed !== undefined) {
            if (proceed) {
                logout()
                submitForm(lockedValues)
            }
            else {
            }
        }
    }, [proceed])

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
                            <DisplayLists displayItem={lockedRooms} changeChat={getPassword} />
                        </RichPanel>
                        <RichPanel icon={<Unlock color="brand" />} label="Unlocked Rooms">
<<<<<<< HEAD
                            <DisplayLists displayItem={unlockedRooms} changeChat={changeChat} />
=======
                            <Box pad='small' gap="none" overflow="auto" style={{ maxHeight: '400px' }}>
                                <Box gap="xsmall">
                                    <Text color="dark-3">
                                        {
                                            allRooms
                                                ? (
                                                    <Box>

                                                        {
                                                            allRooms.map((room) => (
                                                                <Link to={`/chat?name=${name}&room=${room}`} target="_blank">

                                                                <Text key={room} >
                                                                    <StatusGoodSmall  style={{cursor: 'pointer'}} color='status-ok' size='small' />
                                                                    <strong> {room}</strong>
                                                                </Text>
                                                                </Link>
                                                            ))
                                                        }
                                                    </Box>
                                                )
                                                : null
                                        }
                                    </Text>
                                </Box>
                            </Box>
>>>>>>> master
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
                                                            <Text>
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
            {error && (
                <Layer
                    position="bottom"
                    modal={false}
                    margin={{ vertical: "medium", horizontal: "small" }}
                    onEsc={onClose}
                    onClickOutside={onClose}
                    responsive={false}
                    plain
                >
                    <Box
                        align="center"
                        direction="row"
                        gap="small"
                        justify="between"
                        round="medium"
                        elevation="medium"
                        pad={{ vertical: "xsmall", horizontal: "small" }}
                        background="status-warning"
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            <StatusWarning />
                            <Text>{errorMessage}</Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={onClose} plain />
                    </Box>
                </Layer>
            )}

        </Box>

    );
};

export default SideBar