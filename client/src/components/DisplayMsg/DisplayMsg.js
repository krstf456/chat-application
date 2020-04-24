import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import { Box, Text } from "grommet";


const DisplayMsg = ({ messages, name }) => (
  <>
    <Box>

      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </Box>
  </>
);

export default DisplayMsg;