import React, { useEffect, useRef } from 'react'
import Message from './Message/Message';
import { Box, Text } from "grommet";


const DisplayMsg = ({ messages, name }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <Box height='medium' gap='none'>
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
      <div ref={messagesEndRef} />
    </Box>
  )
}

export default DisplayMsg;