import React from 'react'
import Link from 'next/link'
import { usePeriod } from '../Hooks/usePeriod'
import Image from 'next/image'
function OtherVideo({video}) {
    const period = usePeriod(video.Created_at)
  return (
    <>
        <div id="items " className="flex flex-col">
            <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
                    <Link href={`/Watch?v=${video.uniid}`}>
                        <Image width={100} height={100}  src={`/Thumbnails/`+ video.Image} className="w-[100%]  h-[100%] object-cover" alt="fisrt video"/>
                    </Link>
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