import Image from 'next/image'
import React from 'react'

function Comment({comment}) {
  return (
    <>
    <div className='flex space-x-2'>
      <div className='w-[2rem] h-[2rem] rounded-full'>
          {
            comment.Photo ?
            <Image src={`/Thumbnails/${comment.Photo}`} width={80} height={80} alt='image_comment' className='w-full h-full rounded-full' />
            :
            <Image src="/img/logo.png" width={80} height={80} alt='image_comment' className='w-full h-full rounded-full' />
          }
      </div>
      <div className='flex-col w-[18.5rem] rounded-sm bg-gray-100 p-2'>
          <span className='text-lg font-bold'>{comment.PageName}</span>
          <p className=''>
          {comment.Body}
          </p>
      </div>
    </div>
    </>
  )
}

export default Comment