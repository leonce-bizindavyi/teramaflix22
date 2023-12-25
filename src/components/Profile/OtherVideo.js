import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { usePeriod } from '../Hooks/usePeriod'
import Image from 'next/image'
function OtherVideo({video}) {
    const period = usePeriod(video.Created_at)
  return (
    <>
        <div id="items " className="flex flex-col">
            <div className="imag md:w-[270px] w-full md:h-[170px]  h-[200px] rounded  overflow-hidden">
            {
              video.Image == 1 ?
              <Link href={`/short`}> 
                <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Image}`}
                 width={800} height={800} 
                 className="w-[100%]  h-[100%] object-fit" alt="videos"
                 priority={true} placeholder='blur'
                 blurDataURL="data:image/png;base64,...(base64-encoded image data)"/>
              </Link>
              :
              <Link href={`/Watch?v=${video.uniid}`}>
                  <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Image}`} 
                  width={800} height={800} alt='video' 
                  className="video w-[100%]  h-[100%] object-fit"
                  priority={true} placeholder='blur'
                  blurDataURL="data:image/png;base64,...(base64-encoded image data)"/>
              </Link>
             }    
            </div>
            <div className="ggg sm:w-45 lg:w-53 details bg-gray-200 text-gray-700 relative bottom-2  flex flex-col rounded-b-xl">
                <div className="flex justify-center"><h3 className=" h-8 overflow-hidden py-2 text-base ">{video.Title}</h3></div>
                <div className="flex flex-row justify-between p-1 px-4 pb-3">
                    <span className=" text-xs ">{video.Views} vues</span>
                        <span className=" text-xs" >{period}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default OtherVideo