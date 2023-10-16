import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
function Sub({page}) {
  const router = useRouter()
  const handleView = (uuid)=>{
    router.push(`/profile?c=${uuid}`)
  }
  if(!page) return null
  return (
    <>
        <div className="bg-gray-200 grid grid-cols-1 w-52 h-64 mt-6 rounded-lg">
          <div className="h-[4.8rem] w-[4.8rem] lg:w-[7rem] lg:h-[7rem] rounded-full mx-auto py-4">
            {
              page.Photo ?
              <Image className="rounded-full w-full h-[4.8rem] lg:h-[7rem]" src={`/Thumbnails/${page.Photo} `} alt='photo2' width={150} height={150} />
              :
              <Image className="rounded-full w-full h-[4.8rem] lg:h-[7rem]" src="/img/logo.png" alt='photo2' width={150} height={150} />
            }
          </div>
          <div className='mb-1  flex-col space-y-2'>
            <label className="text-blue-700 flex justify-center font-bold">{page.PageName}</label>
            <label className="flex justify-center  text-blue-600 p-1">{page.Abonnes} subscribers</label>
            <div className="cursor-pointer flex justify-center mx-auto bg-purple-600 rounded-md w-[6rem] h-[2rem] hover:bg-blue-700">
              <button onClick={()=>handleView(page.uniid)} className="font-bold text-white">View</button>
            </div>
          </div>
        </div>
</>
  )
}

export default Sub