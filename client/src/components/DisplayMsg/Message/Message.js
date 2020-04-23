import React from 'react';
import { Box, Text } from "grommet";
import styled from 'styled-components';


const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (

        isSentByCurrentUser
            ? (
                <Box 
                direction='row'
                flex
                width='100%'
                justify='end'
                style={{ padding: '0 5%', marginTop: '3px'}}
                alignSelf='center'>
                    <Text fontSize='1.1em' flex style={{alignItems: 'center', color: '#828282', marginTop: '7px', paddingRight: '10px'}}>{trimmedName}</Text>
                    <Box
                        round='small'
                          background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
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
                          background="light-2"
                          style={{padding: '6px 20px', display: 'inline-block', maxWidth: '80%'}}>

                    <Text  fontSize='1.1em' flex style={{alignItems: 'center', color: '#828282', marginTop: '3px', paddingRight: '10px'}}>{text}</Text>
                    </Box>
                    <Text style={{width: '20%',fontSize: '1.1em', marginTop: '7px', paddingLeft: '10px'}}>{user}</Text>
                </Box>
            )

    )
}

export default Message
