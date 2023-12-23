import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Result({ video }) {

  return (
    <>
      <div className="video1 flex flex-row w-full  justify-between md:px-6 mb-6 cursor-pointer ">
        <div className="flex flex-col m-0 md:flex-row h-[260px] md:h-[150px]    bg-gray-100 space/-x-1 md:space-x-5 w-[100%] md:w-[80%] md:rounded-2xl  ">
          <div className="  w-full w-[1/20px] md:w-[250px] h-[210px] md:h-[130px] md:h-[150px] md:rounded-2xl   overflow-hidden">
            {
              video.Short == 1 ?
                <Link href={`/short`}>
                  <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Image}`}
                    width={800} height={800}
                    className="w-[100%]  h-[100%] object-fit" alt="videos"
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                </Link>
                :
                <Link href={`/Watch?v=${video.uniid}`}>
                  <Image src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Image}`}
                    width={800} height={800} alt='video'
                    className="video w-[100%]  h-[100%] object-fit"
                    priority={true} placeholder='blur'
                    blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                </Link>
            }
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-[1rem] md:text-[1.5rem]">{video.Title}</h1>
            <p className="text-sm md:text-base">{video.Body.split('\n').slice(0, 2).join('\n')}</p>
            <Link href={`/profile?c=${video.Uuid}`}>
              <div className="description flex items-center  text-sm">
                {
                  video.Photo ?
                    <Image width={500} height={500} alt='profile'
                      className=" w-10  h-10 my-1 ml-15 rounded-full "
                      src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Photo}`}
                      priority={true} placeholder='blur'
                      blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                    :
                    <Image width={500} height={500} alt='profile'
                      className=" w-10  h-10 my-1 ml-15 rounded-full "
                      src={`/img/logo.png`}
                      priority={true} placeholder='blur'
                      blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
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

export default Result