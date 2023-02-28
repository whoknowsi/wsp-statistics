import React from 'react'
import './ChatMessage.css'

const ChatMessage = ({ date, messages }) => {
    console.log(messages)
    return (
        <>
            <p className='container_date'>{`${date}`}</p>
            {[...messages].splice(0, 15).map(({ message, time }, index) => {

                return (
                    <div key={index + time} className='container_message'>
                        <p className='container_message_message'>{`${message}`}</p>
                        <p className='container_message_time'>{`${time}`}</p>
                    </div>
                )
            })}
        </>

    )
}

export default ChatMessage