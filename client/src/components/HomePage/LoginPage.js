import React from 'react'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import backgroundImage from '../../Assets/background.jpg'
import { Box, Button, Form, FormField, TextInput, CheckBox, Layer, Text } from "grommet";

const LoginPage = ({ submitForm, showError,errorMessage }) => {
    const [locked, setLock] = useState(false);
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
            }}>
            <Box border={{ color: 'brand', size: 'medium' }} round={true} pad="medium"
                background={{
                    "color": "light-6",
                    "opacity": true,
                }} >
                <Form onSubmit={({ value }) => { submitForm(value) }}>
                    <Box>
                        <FormField label="Name" name="name" required>
                            <TextInput name="name" />
                        </FormField>
                        <FormField label="Room Name" name="room" required>
                            <TextInput name="room" />
                        </FormField>
                        <FormField name="lockedStatus">
                            <CheckBox
                                name="lockedStatus"
                                label="Locked?"
                                checked={locked}
                                onChange={() => setLock(!locked)}
                            />
                        </FormField>
                        {locked && (
                            <FormField label="Password" name="password" required>
                                <TextInput name="password" />
                            </FormField>
                        )}
                    </Box>
                    <Box direction="row" gap="medium">

                        <Button type="submit" primary label="Sign In" />

                    </Box>

                </Form>
            </Box>
       
        </Box>
    )
}

export default LoginPage