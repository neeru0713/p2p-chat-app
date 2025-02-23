import React from 'react'
import Avatar from '../Avatar'

const ChatAreaHeader = () => {
  return (
    <div className='ChatAreaHeader flex gap-5 bg-gray-100 py-2 px-4 gap-5 items-center'>
        <Avatar/>
        <h1>Name</h1>
    </div>
  )
}

export default ChatAreaHeader