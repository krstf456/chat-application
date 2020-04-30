import React from 'react'
import { Header, Heading, Button, Main, Box } from 'grommet'
import { Logout } from 'grommet-icons';
import DisplayMsg from '../DisplayMsg/DisplayMsg'

const ChatBoxHeader = ({ roomName, messages, name, logout}) => {
    // console.log(name)
    return (
        <Box>
            <Header background="brand" justify='around' >
                <Heading level={5} >
                    {roomName}
                </Heading>
                {/* <Link to='/'> */}
                    <Button icon={<Logout/>} hoverIndicator onClick={()=>{logout()}} />
                {/* </Link> */}
            </Header>
            <Main>
                <DisplayMsg messages={messages} name={name} />
            </Main>
        </Box>)
}

export default ChatBoxHeader
