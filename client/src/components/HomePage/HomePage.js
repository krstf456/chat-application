import React from 'react'
import { useState } from 'react'
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

        // console.log(value.room, value.password, value.lockedStatus)
        test(value.room, value.password, value.lockedStatus)

        // else {
        //     setName(value.name)
        //     setRoom(value.room)
        //     setChat(true)
        // }

    }

    // .then(function (response) {
    //     return response.json();
    // }).then(function (parsedJson) {
    //     console.log('This is the parsed json', parsedJson);
    // })

function handleErrors(response) {
    if (!response.ok) {
        return console.log(response.json());
    }
    return response;
}
const test = async (room, password, status) => {
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
            }).then(handleErrors)
            .then(response => console.log("ok") )
            .catch(error => console.log(error) )
        })
        } catch (error) {
        console.log(error, 'test')
        setError(true);
        setErrorMessage(error)
    }
}

const displayPage = () => {
    let displayPage = <LoginPage submitForm={submitForm} showError={error} />
    if (chat) {

        displayPage = <ChatPage user={name} roomName={room} />
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