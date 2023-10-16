import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Upload({video}) {
  return (
    <>
        <div className="video1 flex flex-row w-full  justify-between md:px-6 mb-6 cursor-pointer ">
            <div className="flex flex-col m-0 md:flex-row h-[260px] md:h-[150px]    bg-gray-100 space/-x-1 md:space-x-5 w-[100%] md:w-[80%] md:rounded-2xl  ">
                <div className="  w-full w-[1/20px] md:w-[250px] h-[210px] md:h-[130px] md:h-[150px] md:rounded-2xl   overflow-hidden">
                    <Link href={`/dashboard/video?w=${video.uniid}`}>
                        <Image width={100} height={100} src={`/Thumbnails/${video.Image}`} className="w-full h-full object-cover" alt="profil"/>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-[1rem] md:text-[1.5rem]">{video.Title}</h1>
                    <p className="text-sm md:text-base">{video.Body}</p>
                    <Link href="/profile">
                        <div className="description flex items-center  text-sm">
                            {
                                video.Photo ?
                                <Image width={100} height={100} alt='' className="lg:w-10 w-8 lg:h-10 h-8 my-1 ml-15 rounded-full " src={`/Thumbnails/${video.Photo}`}/>
                                :
                                <Image width={100} height={100} alt='' className="lg:w-10 w-8 lg:h-10 h-8 my-1 ml-15 rounded-full " src="/img/logo.png"/>
                            }
                            <p className="nom ml-2" >{video.PageName}</p>
                        </div>
                    </Link>
                </div>
                
            </div>
           
        </div>
    </>
  )
}

export default Upload