import React from 'react'

const MessageBox = ({ chatMessages }) => {


    return (
        <div className='h-[25rem] overflow-hidden px-4'>
            <ul className='divide-y div-gray-200'>
                <li>
                    <div className='text-green-800 font-bold'>
                        ChatGPT : 
                    </div>
                    <div>
                        Hi, How can I Help you?
                    </div>
                </li>

            </ul>
        </div>
    )
}

export default MessageBox