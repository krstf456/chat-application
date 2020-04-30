import React from 'react';
import { Box, Text } from "grommet";

const Message = ({ message: { text, session }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();
    console.log(session, name)
    if (session === trimmedName) {
        isSentByCurrentUser = true;
       
    }

    return (
        isSentByCurrentUser
            ? (
                <Box 
                direction='row'
                width='100%'
                justify='end'
                style={{ padding: '0 5%', marginTop: '3px'}}
                alignSelf='center'>
                    <Text fontSize='1.1em' flex style={{alignItems: 'center', color: '#828282', marginTop: '7px', paddingRight: '10px'}}>{trimmedName}</Text>
                    <Box
                        round='small'
                          background="linear-gradient(102.77deg, #ff817a -9.18%, #A2423D 209.09%)"
                          style={{padding: '5px 20px', display: 'inline-block', maxWidth: '80%'}}
                    >
                        <Text style={{width: '20%',fontSize: '1.1em', wordWrap: 'break-word'}}>{text}</Text>
                    </Box>
                </Box>
            )
            : (
                <Box
                direction='row'
                background='light'
                width='100%'
                style={{ padding: '0 5%', marginTop: '3px'}}
                alignSelf='center'>
                    <Box round='small'
                        background="linear-gradient(102.77deg, #F2F2F2 -9.18%, #999999 209.09%)"

                          style={{padding: '6px 20px', display: 'inline-block', maxWidth: '80%'}}>

                    <Text  fontSize='1.1em' flex style={{alignItems: 'center', color: '#828282', marginTop: '3px', paddingRight: '10px'}}>{text}</Text>
                    </Box>
                    <Text style={{width: '20%',fontSize: '1.1em', marginTop: '7px', paddingLeft: '10px'}}>{session}</Text>
                </Box>
            )
    )
}

export default Message
