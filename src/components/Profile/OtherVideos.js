import React,{useState,useEffect} from 'react'
import OtherVideo from './OtherVideo'
import styles from '@/styles/Home.module.css'
function OtherVideos({videos}) {
  
  return (
    <>
      <div id="load_data" className={`${styles.filmcontainer} mt-3  gap-[1rem] `}>
        {
          videos?.map(video=>{
            return <OtherVideo key={video.ID} video={video} />
          })
        }      
      </div>  
    </>
  )
}

export default OtherVideos