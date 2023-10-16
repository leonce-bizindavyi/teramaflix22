import React, { useContext } from "react";
import Link from 'next/link'
import MyContext from './Context';
import Image from "next/image";

function AllVideo({searches,handleAsides}){
const {handleLinkClick} = useContext(MyContext)

const handleClick = async (videoId) => {
    await handleLinkClick();
    handleAsides(videoId);
  };
return(
    <>
   <div className="filmcontainer flex flex-wrap mt-3 gap-[1rem]" >
            {
                searches?.map(video=>{
                return (
                    <>
                    <div className="videocontainer ">
                    <div className="imag w-[270px] h-[170px] rounded  overflow-hidden">
                    <Link onClick={() => handleClick(video.uniid)} href={`/dashboard/video?w=${video.uniid}`}>
                            <Image width={100} height={100} src={`/Thumbnails/`+ video.Image} className="w-[100%]  h-[100%] object-cover" alt=""/>
                    </Link>
                    </div>
    
                    <Link href="">
                        <div className="flex space-x-1 justify-start mb-4">
                            {
                                video.Photo ? <Image width={100} height={100} src={`/Thumbnails/`+ video.Photo} className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " alt="profil"/>:
                                <Image width={100} height={100}  alt ="" className="lg:w-9 w-9 lg:h-9 h-9 my-1 ml-15 rounded-full " src="/img/logo.png"/>
                            }
                            <div className="flex flex-col  space-y-2">
                                <div className="right-1">
                                    <h10 className="text-sm font-medium"> {video.Title} </h10>
                                    <span className="text-sm mt-2"> {video.Nom} </span>
                                </div>
                            </div>
                        </div>
                    </Link>
    
                  </div>
          
                </>
                )
                })   
           }   
        </div>    
    </>
)
}
export default AllVideo;