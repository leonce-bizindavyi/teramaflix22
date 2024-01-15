import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ImageComp from '../ImageComp';

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function Slide({ video }) {
  return (
    <>
      <div className='flex justify-center'>
        <div className="swiper-slide ">
          <div className="">
            <div className="imag sm:h-[170px] h-[250px] flex justify-center items-center bg-gray-100 rounded overflow-hidden  ">
              <Link href={`/Watch?v=${video.uniid}`}>
                <ImageComp src={video.Image} w={400} h={400} a={'video'} />
              </Link>
            </div>
            <p title={video.Title} className="font-bold text-slate-900 text-md ">{truncateText(video.Title, 25)}</p>
            <Link href={`/profile?c=${video.Uuid}`}>
              <div className="flex  justify-center items-center space-x-2 mb-4">
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
                      src={`/img/logo.png`} priority={true}
                      placeholder='blur'
                      blurDataURL="data:image/png;base64,...(base64-encoded image data)" />
                }
                <div className="flex flex-col  space-y-2">
                  <div className="right-1">
                    <h1 className="text-sm text-slate-900 opacity-80  font-semibold">{video.PageName}</h1><br />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Slide