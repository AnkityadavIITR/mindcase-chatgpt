import React from 'react'
import { Button } from '../ui/button'
import useChatStore from '@/utils/chatstore'


const ChatArray = ({globalChat}) => {
  const clearChats=useChatStore((state)=>state.clearChats)
  const setChat=useChatStore((state)=>state.addChat);

  const handleClickChat=(chats)=>{
    console.log(chats);
    clearChats()
    setChat(chats)
  }
  return (
    <div className='mt-5 flex flex-col gap-y-2'>
      {
        globalChat?.map((chat)=>{
          return <Button onClick={()=>handleClickChat(chat.chats)} key={chat.id} className="bg-inherit px-1 justify-start dark:text-[#B4B4B4] text-slate-600 hover:bg-[#d7e0eb] dark:hover:opacity-60 text-[14px]  dark:hover:bg-slate-700 overflow-hidden">{chat.chats[0].parts[0].text}</Button>
        })
      }
    </div>
  )
}

export default ChatArray
