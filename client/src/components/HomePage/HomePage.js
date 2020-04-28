import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import backgroundImage from '../../Assets/background.jpg'
import { Box, Button, Form, FormField, TextInput, CheckBox } from "grommet";

const HomePage = () => {
    const defaultValue = {
        name: '',
        room: ''
    };

    const [value, setValue] = useState(defaultValue);
    const [locked, setLock] = useState();
    return (

                    
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