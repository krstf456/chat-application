import React from 'react'
import { useState, useEffect } from 'react'
import LoginPage from './LoginPage'
import ChatPage from '../ChatPage/ChatPage'
import { Add, FormClose, StatusGood } from "grommet-icons";
import { Box, Button, Layer, Text } from "grommet";

const HomePage = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [chat, setChat] = useState(false)
    const [error, setError] = useState(false);
    const onClose = () => setError(undefined);
    const [errorMessage, setErrorMessage] = useState('')

    const submitForm = (value) => {
        authentication(value.room, value.password, value.lockedStatus)
        setName(value.name)
        setRoom(value.room)
    }

    const authentication = async (room, password, status) => {
        setError(false);
        try {
            fetch('http://localhost:5000/rooms', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomName: room,
                    password: password,
                    status: status
                })
            }).then(function (response) {
                return response.json();
            }).then(function (parsedJson) {
                console.log(parsedJson)
                if (parsedJson.error) {
                    console.log('This is the parsed json', parsedJson);
                    setError(true);
                    setErrorMessage(parsedJson.error)
                }
                else {
                    console.log('ok')
                    setChat(true)
                }
            })
        } catch (error) {
            console.log(error, 'test')

        }
    }

    const displayPage = () => {
        let displayPage = <LoginPage submitForm={submitForm} showError={error} />
        if (chat) {

            displayPage = <ChatPage user={name} roomName={room} setChat={setChat} />
        }
        return displayPage
    }

    return (
        <>{displayPage()}
            {error && (
                <Layer
                    position="bottom"
                    modal={false}
                    margin={{ vertical: "medium", horizontal: "small" }}
                    onEsc={onClose}
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
                        background="status-ok"
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            <StatusGood />
                            <Text>{errorMessage}</Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={onClose} plain />
                    </Box>
                </Layer>
            )}
        </>
    )
}

export default HomePage