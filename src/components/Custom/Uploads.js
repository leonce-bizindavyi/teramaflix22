import Link from 'next/link'
import React from 'react'
function Upload({videos}) { 
  return (
    <>
      <div  className="video-list h-[150px] min-w-[40%] max-w-[100%] bg-gray-100 p-4 overflow-auto space-y-2">
        {
          videos?.map(video =>{
          return (
            <Link key={video.ID} href={`/editvideo/${video.uniid}`}  className="video1  flex flex-row justify-between items-center space-x-4 bg-gray-300 p-4 rounded">
              <div  className="flex flex-row items-end ">
                <span  className="text-[1.2rem] font-semibold">{video.Title}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="remove-video w-5 h-5 cursor-pointer">
                <path  strokeLinecap="round"  strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          )
          })
        }
      </div>
    </>
  )
}
export default Upload