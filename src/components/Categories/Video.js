import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Video({ video }) {
  return (
    <>
      <div className=" ">
        <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
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
        <Link href={`/profile?c=${video.Uuid}`}>
          <div className="flex space-x-1 justify-start mb-4">
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
            <div className="flex flex-col  space-y-2">
              <div className="right-1">
                <h10 className="text-sm font-medium">{video.Title}</h10><br />
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