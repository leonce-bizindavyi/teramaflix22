import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePeriod } from '../Hooks/usePeriod'
function Video({video,handleAsides}) {
const period = usePeriod(video.Created_at)
  return (
    <>
    <div className="lg:h-[115px]   sm:h-[450px] w-full  overflow-hidden flex lg:flex-row flex-col lg:justify-center lg:items-start lg:space-x-2">
        <div className="imagevideo h-[200px] w-full md:h-[100%] lg:w-[45%]  lg:rounded overflow-hidden">
            {
                video.Short == 1 ?
                <Link  href={`/short`} style={{textDecolation: "none"}}>
                    <Image width={100} height={100} alt='video' src={`/Thumbnails/${video.Image}`} className=" lg:rounded h-full w-full object-cover" />
                </Link>
                :
                <Link  href={`/Watch?v=${video.uniid}`} style={{textDecolation: "none"}}>
                    <Image width={100} height={100} alt='video' src={`/Thumbnails/${video.Image}`} className=" lg:rounded h-full w-full object-cover" />
                </Link>
            }
        </div>
        <div className="descriptionV flex flex-col  space-y-1 pl-2 lg:p-3 lg:h-[100%] h-[20%] w-full bg-gray-100 lg:w-[60%] lg:rounded">
            <Link href={`/profile?c=${video.uniid}`}>
                <div className="videoName font-semibold lg:text-[18px] text-[18px]">{video.Title}</div>
                <div className="profilChannel  flex justify-start items-center space-x-2  cursor-pointer ">
                    {
                        video.Photo ?
                        <Image width={80} height={80} src={`/Thumbnails/${video.Photo}`} className="lg:w-6 w-8 lg:h-6 h-8 my-1 rounded-full " alt="logo"/>
                        :
                        <Image width={80} height={80} src="/img/logo.png" className="lg:w-6 w-8 lg:h-6 h-8 my-1 rounded-full " alt="logo"/>
                    }
                    <div className="flex flex-col  space-y-2">
                            <div className="right-5">
                                <div className="text-md text-slate-900 opacity-90  font-bold">{video.PageName}</div>
                                <span className="text-xs text-slate-900 opacity-70 font-semibold">{video.Views} Views  {period}</span>
                            </div>
                   </div>
                </div>
            </Link>
        </div>
    </div>   
    </>
  )
}

export default Video

