import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import { Box, Text } from "grommet";


const DisplayMsg = ({ messages, name }) => (
  <>
    {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
  </>
);

export default DisplayMsg;