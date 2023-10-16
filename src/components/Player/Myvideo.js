import React from 'react'
import styles from '@/styles/Player.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { usePeriod } from '../Hooks/usePeriod'
function Myvideo({video,handleAsides}) {
const period = usePeriod(video.Created_at)
  return (
    <>
        <div className={`${styles.videocontainer}`}>
            <div className="imag md:w-[270px] w-full md:h-[170px]  h-[200px] rounded  overflow-hidden ">
                {
                    video.Short == 1 ?
                    <Link href={`/short`}>
                        <Image width={100} height={100} src={`/Thumbnails/${video.Image}`} className="w-[100%]  h-[100%] object-fit" alt="short"/>
                    </Link>
                    :
                    <Link href={`/Watch?v=${video.uniid}`}>
                        <Image width={100} height={100} src={`/Thumbnails/${video.Image}`} className="w-[100%]  h-[100%] object-fit" alt="video"/>
                    </Link>
                }
            </div>
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
    </>
  )
}

export default Myvideo