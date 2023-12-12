import Image from 'next/image'
import React,{useState,useEffect} from 'react'

function Comment({comment}) {
  const [profBlobUrl, setProfBlobUrl] = useState('/img/logo.png');
  useEffect(() => {
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
    fetchProfile(comment.Photo)
  }, [comment])
  return (
    <>
       <div className="userComment flex flex-row space-x-1  mb-5">
            <div className="userProfil  cursor-pointer w-[10%] ">
                {
                  comment.Photo ?
                  <Image width={80} height={80} src={profBlobUrl} className="w-10 h-9  rounded-full " alt="logo"/>
                  :
                  <Image width={80} height={80} src={profBlobUrl} className="w-10 h-9  rounded-full " alt="logo"/>
                }
            </div>
            <div className="userTextComment bg-blue-500 max-w-[90%] rounded-lg px-[20px] py-[6px]">
                <h5 className="userName font-semibold">{comment.PageName}</h5>
                <p className="leading-[1rem]">{comment.Body}</p>
            </div>
        </div> 
    </>
  )
}

export default Comment