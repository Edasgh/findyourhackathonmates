import React from 'react'

const MessageEl = ({sender,isOwnMsg,message}) => {
  return (
    <div className={`flex ${isOwnMsg ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isOwnMsg ? "bg-[#a600f0]" : "bg-footerBg"
        }  text-textPrimary `}
      >
       <p className='text-sm font-bold' >{sender}</p>
       <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageEl