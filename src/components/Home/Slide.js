import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Slide({video}) {
  const [imageBlobUrl, setImageBlobUrl] = useState('/img/thumb.jpg');
  const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Thumbnails/${video.Image}`);
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
          const response = await fetch(`http://localhost:8080/Thumbnails/${photo}`);
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
    <div className='flex justify-center'>
        <div className="swiper-slide ">
        <div className="">
            <div className="imag sm:h-[170px] h-[250px] rounded overflow-hidden  ">
              <Link href={`/Watch?v=${video.uniid}`}>
                  <Image src={`${imageBlobUrl}`} width={100} height={100} alt='video' className="video w-[100%]  h-[100%] object-fit"/>
              </Link>
            </div>
            <p className="font-bold text-slate-900 text-md ">{video.Title} </p>
            <Link href={`/profile?c=${video.Uuid}`}>
                <div className="flex  justify-start items-center space-x-2 mb-4">
                    <Image width={80} height={10} alt='profile' className=" w-10  h-10 my-1 ml-15 rounded-full " src={`${profBlobUrl}`} />
                <div className="flex flex-col  space-y-2">
                    <div className="right-1">
                        <h1 className="text-sm text-slate-900 opacity-80  font-semibold">{video.PageName}</h1><br/>
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