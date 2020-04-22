import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import backgroundImage from '../../Assets/background.jpg'
import { Box, Button, Form, FormField, TextInput } from "grommet";

const HomePage = () => {
    const defaultValue = {
        name: '',
        room: ''
    };
    const [value, setValue] = useState(defaultValue);

    return (
            <Box align='center' justify='center' height='100vh'
                background={{
                    "color": "light-1",
                    "dark": false,
                    "opacity": true,
                    "position": "bottom",
                    "repeat": "no-repeat",
                    "size": "cover",
                    "image": `url(${backgroundImage})`
                }} >
                <Box border={{ color: 'brand', size: 'medium' }} round={true} pad="medium"
                background={{
                    "color": "light-6",
                    "opacity": true,
                }} >
                    <Form
                        value={value}
                        onChange={nextValue => {
                            console.log("Change", nextValue);
                            setValue(nextValue);
                        }}
                    >
                        <Box>
                            <FormField label="Name" name="name">
                                <TextInput name="name" />
                            </FormField>
                            <FormField label="Room Name" name="room">
                                <TextInput name="room" />
                            </FormField>
                        </Box>
                        <Box direction="row" gap="medium">
                            <Link onClick={(event) => (!value.name || !value.room) ? event.preventDefault() : null} to={`/chat?name=${value.name}&room=${value.room}`}>
                                <Button type="submit" primary label="Sign In" />
                            </Link>
                        </Box>
                    </Form>
                </Box>
            </Box>
    )
}

export default HomePage