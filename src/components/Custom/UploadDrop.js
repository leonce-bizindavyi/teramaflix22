import React, {useState,useContext,useEffect} from 'react'
import Video from './Video'
import PopAddVideo from './PopAddVideo'
import ProgressCircle from './ProgressCircle';
import Upload from './Uploads';
import { SessionContext } from '../context/Auth';
function UploadDrop() {
  const auth = useContext(SessionContext)
  const [addvid, setAddvid] = useState(false)
  const [auto, setAuto] = useState(12);
  const [isEmpty, setEmpty] = useState(true)
  const [percentage, setPercentage] = useState(0);
  const [videos, setVideos] = useState([])
  const [uploads, setUploads] = useState(null)
  const handleaddvid = (stat)=>{
      setAddvid(stat)
  }
  const fetchUploads = async () =>{
    const user = auth.session;
    const response = await fetch(`/api/posts/hidePosts/${user.ID}`)
    const data = await response.json()
    if(data.length == 0) {
    }
    else {
      console.log(data)
      setUploads(data)
    }
}
  useEffect(() => {
    if(auth.session){
      setAuto(auth.session)
      fetchUploads()
      const fetchVideos = async () =>{
            const user = auth.session
            const response = await fetch(`/api/posts/allPost/${user.ID}/0/25`)
            const data = await response.json()
            if(data.length == 0) {
              setEmpty(true)
            }
            else {
              setEmpty(false)
              setVideos(data)
            }
      }
      fetchVideos()
    }   
  }, [auth])
   const handleUpload = async (videos) => {
    setAddvid(false)
    const formData = new FormData();
    formData.append(`user`, auto.ID);
    for(let i = 0; i < videos.length; i++) {
      formData.append(`${i}`, videos[i]);
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');
    xhr.upload.addEventListener('progress', (e) => {
      const percent = (e.loaded / e.total) * 100;
      setPercentage(percent.toFixed(0))
      // Mettre à jour la barre de progression ou le cercle de progression ici
    });
    xhr.upload.addEventListener('load', () => {
      fetchUploads()
      console.log('Upload terminé !');
      // Mettre à jour la barre de progression ou le cercle de progression ici
    });
    xhr.send(formData);
    
    
  };
  return (
    <>
       <div className="vidManager flex flex-row justify-between">
          <h2 className="text-[1.5rem] font-semibold">Video Manager</h2>
          <button onClick={()=>handleaddvid(true)} className="addVid flex flex-row justify-center items-center bg-blue-500 h-10 hover:bg-blue-900 duration-1000  px-4 md:py-2 md:mr-6 mt-2 text-sm md:text-base font-semibold   rounded-l-full rounded-r-none  text-white  ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path strokeLinejoin="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>                  
            <span className="btn-add-video">Add video</span> 
          </button>
        </div>
          <div className="  w-full flex flex-col relative min-h-[500px]"> 
            {
              addvid ?
              <>
              <div className="filmcontainer flex flex-wrap  blur mt-3 gap-[1rem]">
              {isEmpty ? <h2 className="text-[1.5rem] font-semibold">Upload Videos Here !! </h2> : null}
                {
                  videos?.map(video=>{
                    return <Video key={video.ID} video={video} />
                  })
                }
              </div>
              <PopAddVideo handleaddvid={handleaddvid} handleUpload={handleUpload} />
              </>
              :
              <div className="filmcontainer flex flex-wrap mt-3 gap-[1rem]">
                {isEmpty ? <h2 className="text-[1.5rem] font-semibold">Upload Videos Here !! </h2> : null}
                {
                  videos?.map(video=>{
                    return <Video key={video.ID} video={video} />
                  })
                }
              </div>
            }
            
              <div className='w-[100%] flex justify-end'>
              {
              percentage==0 | percentage==100 ? null
              :
               <ProgressCircle percentage={percentage} />
              }
              {
              uploads ? 
              <Upload key={uploads.ID} videos={uploads} />
              :
               null
              }
               
              </div>
            
          
        </div>
    </>
  )
}

export default UploadDrop