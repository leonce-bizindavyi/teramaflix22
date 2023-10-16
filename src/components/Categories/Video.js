import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Video({video}) {
  return (
    <>
        <div className=" ">
            <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
                <Link href={`/Watch?v=${video.uniid} `}>
                    <Image  src={`/Thumbnails/${video.Image}`} width={100} height={100} className="w-[100%]  h-[100%] object-cover" alt="Thumbnail de la vidéo"/>
                </Link>
            </div>
            <Link href={`/profile?c=${video.Uuid}`}>
                <div className="flex space-x-1 justify-start mb-4">
                    {
                        video.Photo ?
                        <Image  width={100} height={100} className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " src={`/Thumbnails/${video.Photo}`} alt="Photo de profil de l'utilisateur"/>
                        :
                        <Image width={100} height={100} className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " src="/Image /logo.png" alt="Logo par défaut"/>
                    }
                <div className="flex flex-col  space-y-2">
                    <div className="right-1">
                        <h10 className="text-sm font-medium">{video.Title}</h10><br/>
                        <span className="text-sm">{video.PageName}</span>
                    </div>
                </div>
                </div>
            </Link>
        </div>
    </>
  )
}

export default Video