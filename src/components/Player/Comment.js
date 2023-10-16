import Image from 'next/image'
import React from 'react'

function Comment({comment}) {
  return (
    <>
       <div className="userComment flex flex-row space-x-1  mb-5">
            <div className="userProfil  cursor-pointer w-[10%] ">
                {
                  comment.Photo ?
                  <Image width={80} height={80} src={`/Thumbnails/${comment.Photo}`} className="w-10 h-9  rounded-full " alt="logo"/>
                  :
                  <Image width={80} height={80} src="/img/logo.png" className="w-10 h-9  rounded-full " alt="logo"/>
                }
            </div>
            <div className="userTextComment bg-blue-500 max-w-[90%] rounded-lg px-[20px] py-[6px]">
                <h5 className="userName font-semibold">{comment.PageName}</h5>
                <p className="leading-[1rem]">{comment.Body}</p>
            </div>
        </div> 
    </>
  )
}

export default Comment