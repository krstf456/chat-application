import React from 'react'
import { Header, Heading, Button } from 'grommet'
import { Home } from 'grommet-icons';
import { Link } from 'react-router-dom'
const ChatBoxHeader = ({ roomName }) => {
    return (
        <Header background="brand" justify='around' >
            <Heading level={5} >
                {roomName}
            </Heading>
            <Link to='/'>
                <Button icon={<Home />} hoverIndicator />
            </Link>
        </Header>

    )
}

export default ChatBoxHeader
