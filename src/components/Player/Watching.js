import Title from '../Title';
import React,{useRef,useState,useEffect,useContext} from 'react';
import { useFormatDuration } from '../Hooks/useFormatDuration';
import { useRouter } from 'next/router';
import { SessionContext } from '../context/Auth';

function FormatDuration(time){
  const resul =  useFormatDuration(time)
  return resul
}


function Watching({videoprops}) {
  const router = useRouter()
  const videoRef = useRef(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState('');
  const [paused, setPaused] = useState("paused")
  const [volumeLevel, setVolumeLevel] = useState("high")
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState("1")
  const [screen, setScreen] = useState("")
  const [counter, setCounter] = useState(0);
  //handle play or pause video
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPaused('');
      } else {
        videoRef.current.pause();
        setPaused('paused');
      }
    }
  };
  
  // handle mute video
  const toggleMute = () => {
    if (videoRef.current) {
      if(videoRef.current.muted){
        setVolume(1)
        setVolumeLevel("high")
        videoRef.current.muted= false;
      }else{
        setVolume(0)
        setVolumeLevel("muted")
        videoRef.current.muted= true;
      }
    }
  };
// change volume 
    const handleVolumeChange = (e) => {
      const newVolume = e.target.value;
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
      }
    };

    //toggle Playback Speed Menu
    const togglePlaybackSpeedMenu = () =>{
      setShowPlaybackSpeedMenu(!showPlaybackSpeedMenu)
    }
    //handle set Playback Speed Value
   const setPlaybackSpeedValue = (speed)=>{
    if(videoRef.current){
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowPlaybackSpeedMenu(!showPlaybackSpeedMenu);
    }
   }

   // handle set full screen mode
   const handleFullScreen = () => {
    const videoContainer = document.querySelector('.video-container'); // Sélectionnez la classe qui contient votre vidéo
  
    if (videoContainer) {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        setScreen("")
      } else {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) {
          videoContainer.mozRequestFullScreen();
        } else if (videoContainer.webkitRequestFullscreen) {
          videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
          videoContainer.msRequestFullscreen();
        }
        setScreen("full-screen")
      }
    }
  };
  
  //handle set picture In Picture Element
   const togglePictureInPicture = () => {
      const videoElement = document.querySelector('video');

      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        if (videoElement) {
          videoElement.requestPictureInPicture();
        }
      }
    };


    //handle update time format
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    //handle update time
    const updateTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
      }
    };


    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.addEventListener('timeupdate', updateTime);
      }
      let count = 0;
      const interval = setInterval(() => {
        if(!videoRef.current.paused){
          count++
        }
      }, 1250);
      
      const handleRouteChange = (url, { shallow }) => {
        if (!shallow) {
          console.log("Hello world",count)
        }
      };
      router.beforePopState();
      router.events.on('routeChangeStart', handleRouteChange);

      return () => {
          router.events.off('routeChangeStart', handleRouteChange);
          clearInterval(interval);
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', updateTime);
        }
      };
    }, []);


  useEffect(() => {
    const fetchVideo = async (video) => {
      try {
        const response = await fetch(`/Videos/${video}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setVideoBlobUrl(blobUrl);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    
    fetchVideo(videoprops.Video)
  }, [videoprops])
  

if (!videoprops) return null

  return (
    <>
    <Title title={`${videoprops.Title} - TeramaFlix`} />
    <div 
    className={`video-container ${paused} ${screen} mini-player w-full lg:w-[100%] rounded relative `} 
    data-volume-level={`${volumeLevel}`}>
      <div  onClick={togglePlay} className={`controls z-20 play-center absolute  flex justify-center items-center h-full w-full`}>
          <button className="play-pause-btn center  bg-blue-500 bg-opacity-90  md:w-20 w-14 md:h-20 h-14  rounded-full cursor-pointer ">
            <svg className="play-icon text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="pause-icon text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
      </div>
      
      <div className={`video-controls-container`}>
        <div className="timeline-container">
          <div className="timeline">
            <div
              className="thumb-indicator" ></div>
          </div>
        </div>

        <div className="controls z-0">
          <button onClick={togglePlay} className="play-pause-btn">
            <svg className="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          
          <div className="volume-container " >
            <button onClick={toggleMute} className="mute-btn">
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
              </svg>
            </button>
            <input className="volume-slider" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolumeChange}/>
          </div>
          <div className="duration-container">
            <div className="current-time">{formatTime(currentTime)}</div>
            /
            <div className="total-time">{formatTime(duration)}</div>
          </div>
          <div className='speed' >
                {showPlaybackSpeedMenu && (
                  <div className="speed-menu absolute right-14 -top-[7rem] z-1  flex flex-col justify-center rounded-md items-center bg-gray-100 w-max px-4 text-slate-800 ">
                    <button onClick={() => setPlaybackSpeedValue(0.5)}>0.5x</button>
                    <button onClick={() => setPlaybackSpeedValue(0.75)}>0.75x</button>
                    <button onClick={() => setPlaybackSpeedValue(1)}>1x</button>
                    <button onClick={() => setPlaybackSpeedValue(1.25)}>1.25x</button>
                    <button onClick={() => setPlaybackSpeedValue(1.5)}>1.5x</button>
                  </div>
                )}
              <button className="speed-btn wide-btn " onClick={togglePlaybackSpeedMenu}>
              {playbackSpeed}x
              </button>
          </div>
          
          
          <button className="mini-player-btn" onClick={togglePictureInPicture}>
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
            </svg>
          </button>
          
          <button className="full-screen-btn" onClick={handleFullScreen}>
            <svg className="open" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            <svg className="close" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
          </button>
        </div>
      </div>
      <video  onClick={togglePlay} ref={videoRef} src={videoBlobUrl} className='rounded h-[420px]' 
      />
    </div> 
    </>
  )
}

export default Watching