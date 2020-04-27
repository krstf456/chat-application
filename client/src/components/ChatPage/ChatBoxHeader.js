import React from 'react'
import { Header, Heading, Button, Main, Footer, Box } from 'grommet'
import { Logout } from 'grommet-icons';
import { Link } from 'react-router-dom'
import DisplayMsg from '../DisplayMsg/DisplayMsg'
import Input from '../Input/Input'

const ChatBoxHeader = ({ roomName, messages, name}) => {
    // console.log(name)
    return (
        <Box>
            <Header background="brand" justify='around' >
                <Heading level={5} >
                    {roomName}
                </Heading>
                <Link to='/'>
                    <Button icon={<Logout />} hoverIndicator />
                </Link>
            </Header>
            <Main>
                <DisplayMsg messages={messages} name={name} />
            </Main>
          
        </Box>)
}

export default ChatBoxHeader
