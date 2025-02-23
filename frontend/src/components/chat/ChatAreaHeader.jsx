import React from 'react'
import Avatar from '../Avatar'

const ChatAreaHeader = ({selectedChat}) => {
  return (
    <div className='ChatAreaHeader flex gap-5 py-2 px-4 gap-5 items-center'>
        <Avatar/>
        <h1>{selectedChat.partnerEmail}</h1>
    </div>
  )
}

export default ChatAreaHeader