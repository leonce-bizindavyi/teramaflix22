import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { usePeriod } from '../Hooks/usePeriod'
import Image from 'next/image'
function Video({video}) {
  const period = usePeriod(video.Created_at)
  const [imageBlobUrl, setImageBlobUrl] = useState('/img/thumb.jpg');
  const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/Thumbnails/${video.Image}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setImageBlobUrl(blobUrl);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    const fetchProfile = async (photo) => {
      try {
        if(photo){
          const response = await fetch(`/Thumbnails/${photo}`);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setProfBlobUrl(blobUrl);
        }else{
          const response = await fetch(`/img/logo.png`);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setProfBlobUrl(blobUrl);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchProfile(video.Photo)
    fetchImage()
  }, [video])
  
  return (
    <>
       <div className={styles.videocontainer}>
          <div className="imag w-[100%] sm:h-[170px] h-[250px]  sm:rounded  overflow-hidden">
             {
              video.Short == 1 ?
              <Link href={`/short`}> 
                <Image src={imageBlobUrl} width={100} height={100} className="w-[100%]  h-[100%] object-fit" alt="videos"/>
              </Link>
              :
              <Link href={`/Watch?v=${video.uniid}`}> 
                <Image src={imageBlobUrl} width={100} height={100} className="w-[100%]  h-[100%] object-fit" alt="videos"/>
              </Link>
             }
          </div>
          <h1 className="font-bold text-slate-900 text-lg ml-2 mb-2 sm:ml-0">{video.Title} </h1>
            <Link href={`/profile?c=${video.Uuid}`}>
            <div className="flex gap-2 justify-start mb-4 ml-2 sm:ml-0">
              <Image width={80} height={80} className=" w-10  h-10 my-1 ml-15 rounded-full " src={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${video.Photo}`} alt='profile'/>
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

export default Video