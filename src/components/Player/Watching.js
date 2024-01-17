import Title from '../Title';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Menu, Item, Separator, useContextMenu, Submenu } from 'react-contexify'
import { useRouter } from 'next/router';
import { SessionContext } from '../context/Auth';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "react-contexify/dist/ReactContexify.css";

const MENU_ID = "menu-id";
function Watching({ videoprops }) {
  const auth = useContext(SessionContext)
  const router = useRouter()
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  let isCPressed = false;
  const videoContainerRef = useRef(null);
  const [hideCntrl, setHideCntrl] = useState('hidden')
  const [hideBtn, setHideBtn] = useState('')
  const [paused, setPaused] = useState("")
  const [volumeLevel, setVolumeLevel] = useState("high")
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState("1")
  const [screen, setScreen] = useState("")
  const [isReady, setIsReady] = useState(false);
  const { show } = useContextMenu({ id: MENU_ID });


  //handle play or pause video
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused && isReady) {
        videoRef.current.play();
        setPaused('');
      } else {
        videoRef.current.pause();
        setPaused('paused');
      }
      setHideBtn('')
      setTimeout(() => {
        setHideBtn('hidden')
      }, 2000);
    }
  };

  // handle mute video
  const toggleMute = () => {
    if (videoRef.current) {
      if (videoRef.current.muted) {
        setVolume(1)
        setVolumeLevel("high")
        videoRef.current.muted = false;
      } else {
        setVolume(0)
        setVolumeLevel("muted")
        videoRef.current.muted = true;
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
  const togglePlaybackSpeedMenu = () => {
    setShowPlaybackSpeedMenu(!showPlaybackSpeedMenu)
  }
  //handle set Playback Speed Value
  const setPlaybackSpeedValue = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowPlaybackSpeedMenu(false);
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

  const handleNext = (next) => {
    if(videoRef.current){
      videoRef.current.currentTime=0
    }
    router.push(`/Watch?v=${next}`)
  }

  //show or hide controls
  const handleHideCtrl = (state) => {
    setHideCntrl(state)
  }
  //handle update time format
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // handle set Contexte menu 
  function handleItemClick({ event, props, triggerEvent, data }) {
    console.log(event, props, triggerEvent, data);
  }
  function displayMenu(e) {
    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show({
      event: e,
    });
  }
  const handlePrevious = () => {
    router.back();
  }
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(videoUrl)
      .then(() => { })
      .catch(err => { });
  };
  //handle update time



  useEffect(() => {
    const video = videoRef.current
    const handleCanPlay = () => {
      console.log('isReady')
      setIsReady(true);
    };
    const handleProgress = () => {
      const { buffered, duration } = video;
      if (buffered.length) {
        const loaded = buffered.end(0);
        const fraction = loaded / duration;
        console.log(loaded, duration, fraction)
        timelineRef.current.style.setProperty("--preview-position", fraction);
      }
    };
    const handleError = () => {
      console.log("Error !")
    };

    const updateTime = () => {
      if (videoRef.current && !isNaN(videoRef.current.duration) && !isNaN(videoRef.current.currentTime)) {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
        const percent = videoRef.current.currentTime / videoRef.current.duration;
        timelineRef.current.style.setProperty("--progress-position", percent);
      }
    };

    if (video) {
      video.addEventListener("timeupdate", updateTime);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('progress', handleProgress);
      video.addEventListener('error', handleError);
    }
    let count = 0;
const interval = setInterval(() => {
  if (videoRef.current && videoRef.current !== null) {
    if (!videoRef.current.paused) {
      count++;
    }
  }
}, 1250);

    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        console.log("Hello world", count);
      }
    };
    router.beforePopState();
    router.events.on("routeChangeStart", handleRouteChange);
    if (auth.session) {
      //views and hours 
      if (auth.session && auth.session != "unlogged") {
        const handleAddHours = async () => {
          const user = auth.session
          const time = count // Récupérer le temps écoulé réel de la vidéo
          const hours = time / 3600; // Conversion en heures
          const response = await fetch(`/api/reactions/addHours/${videoprops.ID}/${user.ID}/${hours.toFixed(4)}`);
          const data = await response.json();
          updateTime()
          if (data) {

          }
        };
        async function insertViews() {
          const user = auth.session
          const timerId = setTimeout(async () => {  // Ajoutez le mot-clé "async" ici
            const response = await fetch(`/api/reactions/addViews/${videoprops.ID}/${user.ID}`);
            const data = await response.json();
          }, 5000);
        }
        insertViews()

        const handleRouteChange = (url, { shallow }) => {
          if (!shallow) {
            handleAddHours();
          }
        };
        router.beforePopState(handleAddHours);
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
          router.events.off('routeChangeStart', handleRouteChange);
        };
      }
    }





    const handleKeyPress = (event) => {
      const video = videoRef.current;
      if (video) {
        if (document.activeElement.classList[0] !== "react-input-emoji--input" && document.activeElement.classList[0] !== "searche-here") {
          switch (event.key) {
            case "ArrowRight":
              event.preventDefault()
              video.currentTime += 5; // Avance de 5 secondes
              break;
            case "ArrowLeft":
              event.preventDefault()
              video.currentTime -= 5; // Recule de 5 secondes
              break;
            case "ArrowUp":
              event.preventDefault()
              if (video.volume < 1.0) {
                video.volume = parseFloat((video.volume + 0.1).toFixed(1)); // Augmente le volume par incréments de 0.1
                setVolume(video.volume)
                setVolumeLevel("high")
                if (video.volume <= 0.2) {
                  setVolume(video.volume)
                  setVolumeLevel("low")
                }
              } else if (video.volume === 1.0) {
                setVolume(video.volume)
                setVolumeLevel("high")
              }
              break;
            case "ArrowDown":
              event.preventDefault()
              if (video.volume > 0.0) {
                video.volume = parseFloat((video.volume - 0.1).toFixed(1)); // Diminue le volume par incréments de 0.1
                setVolume(video.volume)
                setVolumeLevel("high")
                if (video.volume <= 0.2) {
                  setVolume(video.volume)
                  setVolumeLevel("low")
                }
              } else if (video.volume === 0.0) {
                setVolume(0)
                setVolumeLevel("muted")
                videoRef.current.muted = true;
              }
              break;

            case "f":
              handleFullScreen()
              break;
            case "m":
              toggleMute()
              break;
            case "+":
              if (video.playbackRate < 2.0) {
                setPlaybackSpeedValue(video.playbackRate + 0.25);
              }
              break;
            case "-":
              if (video.playbackRate > 0.5) {
                setPlaybackSpeedValue(video.playbackRate - 0.25)
              }
              break;
            case "c":
              if (!isCPressed) {
                video.currentTime = 0;
                togglePlay()
                isCPressed = true;
              }
              break;
            case " ":
            case "k": // Espace pour lecture/pause
              event.preventDefault()
              togglePlay()
              break;
            // Ajoutez d'autres cas pour d'autres touches si nécessaire
            default:
              break;
          }
        }
      }
    };
    const handleKeyUp = (event) => {
      if (document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'text') { } else {
        const video = videoRef.current;
        if (event.key === "c") {
          isCPressed = false;
          video.currentTime = 0;
          togglePlay()
        }
      }

    };
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);


    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
      router.events.off("routeChangeStart", handleRouteChange);
      video.removeEventListener('canplay', handleCanPlay);
      clearInterval(interval);
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [auth]);



  useEffect(() => {
    // Timeline
    if (timelineRef.current) {
      const timelineContainer = timelineRef.current
      timelineContainer.addEventListener("mousedown", toggleScrubbing)
      document.addEventListener("mouseup", e => {
        if (isScrubbing) toggleScrubbing(e)
      })
    }
    let isScrubbing = false
    let wasPaused
    function toggleScrubbing(e) {
      const timelineContainer = timelineRef.current
      const videoContainer = videoContainerRef.current
      const rect = timelineContainer.getBoundingClientRect()
      const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
      isScrubbing = (e.buttons & 1) === 1
      videoContainer.classList.toggle("scrubbing", isScrubbing)
      if (isScrubbing) {
        wasPaused = videoRef.current.paused
        videoRef.current.pause()
      } else {
        videoRef.current.currentTime = percent * videoRef.current.duration
        if (!wasPaused) videoRef.current.play()
      }

    }
  }, [videoprops])
  const videoUrl = `${process.env.NEXT_PUBLIC_URL}/Watch?v=${videoprops.uniid}`;

  if (!videoprops) return 

  const videoId = `/api/stream?videoId=${videoprops.Video}`;

  return (
    <>
      <Title title={`${videoprops.Title} - TeramaFlix`} />
      <div ref={videoContainerRef}
        onMouseEnter={() => handleHideCtrl('')}
        onMouseLeave={() => handleHideCtrl('hidden')}
        onContextMenu={displayMenu}
        className={`video-container ${paused} ${screen} mini-player w-full lg:w-[100%] rounded-md relative `}
        data-volume-level={`${volumeLevel}`}>
        <div onClick={togglePlay} className={`controls  play-center absolute  flex justify-center items-center h-full w-full ${hideBtn}`}>
          <button className="play-pause-btn center z-0  bg-blue-500  bg-opacity-50  md:w-20 w-14 md:h-20 h-14 flex justify-center items-center  rounded-full cursor-pointer ">
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-14 w-10 md:h-14 h-10 play-icon text-white">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>

            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-14 w-10 md:h-14 h-10 pause-icon font-bold text-white">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
            </svg>
   
          </button>
           {/* <div class="loading border-transparent h-14 w-14 animate-spin rounded-full border-4  border-t-blue-700 border-r-blue-700 " /> */}
        </div>

        <div className={`video-controls-container ${hideCntrl}`}>
          <div ref={timelineRef} className="timeline-container">
            <div className="timeline">
              <div
                className="thumb-indicator" ></div>
            </div>
          </div>

          <div className="controls z-0 md:space-x-3 px-3 py-2">
          <button onClick={togglePlay} className="play-pause-btn ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="play-icon w-6 h-6">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="pause-icon w-6 h-6">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
            </svg>
            </button>

            <div onClick={() => handleNext(videoprops.NextVideo)} style={{ backgroundColor: 'black', width: 20 + 'px', height: 20 + 'px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                <path d="m0 0v6l5-3zm5 3v3h2v-6h-2" fill="currentColor" className='text-gray-300 hover:text-white bg-opacity-90  md:w-22 w-14 md:h-22 h-14  rounded-full cursor-pointer  ' transform="translate(0 1)" />
              </svg>
            </div>


            <div className="volume-container " >
            <button onClick={toggleMute} className="mute-btn">
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="volume-high-icon w-6 h-6">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                  <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                </svg>

                <svg className="volume-low-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="volume-muted-icon w-6 h-6">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                </svg>

                
              </button>
              <input className="volume-slider" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolumeChange} />
            </div>
            <div className="duration-container">
              <div className="current-time">{formatTime(currentTime)}</div>
              /
              <div className="total-time">{formatTime(duration)}</div>
            </div>
            <button className='replay font-bold'>
              <svg class="h-6 w-6 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
              </svg>
              </button>
              <div className='speed' >
              {showPlaybackSpeedMenu && (
                <div className="speed-menu absolute right-14 -top-[9rem] z-1  flex flex-col justify-center rounded-md items-center bg-gray-100 w-max px-4 text-slate-800 ">
                  <button onClick={() => setPlaybackSpeedValue(0.5)}>0.5x</button>
                  <button onClick={() => setPlaybackSpeedValue(0.75)}>0.75x</button>
                  <button onClick={() => setPlaybackSpeedValue(1)}>1x</button>
                  <button onClick={() => setPlaybackSpeedValue(1.25)}>1.25x</button>
                  <button onClick={() => setPlaybackSpeedValue(1.5)}>1.5x</button>
                  <button onClick={() => setPlaybackSpeedValue(2)}>2x</button>
                </div>
              )}
              <button className="speed-btn wide-btn " onClick={togglePlaybackSpeedMenu}>
                {playbackSpeed}x
              </button>
              
            </div>


            <button className="mini-player-btn" onClick={togglePictureInPicture}>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
              </svg>
            </button>
            <button className="full-screen-btn" onClick={handleFullScreen}>
              <svg class="h-7 w-7 open"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />  
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />  
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />  
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
              </svg>

                <svg class="h-7 w-7 close"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                    <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
                      <path d="M15 5v2a2 2 0 0 0 2 2h2" />
                        <path d="M5 15h2a2 2 0 0 1 2 2v2" />
                          <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
                </svg>

            </button>
            
          </div>
        </div>
        <video onClick={togglePlay} poster={`${process.env.NEXT_PUBLIC_URL}/Thumbnails/${videoprops.Image}`} ref={videoRef} src={videoId} onEnded={() => handleNext(videoprops.NextVideo)} className='rounded' autoPlay />
        <Menu id={MENU_ID}>
          {videoRef.current && (
            <>
              <Item onClick={togglePlay}>
                <>{videoRef.current.paused ? <span>Play</span> : <span>Pause</span>}</>
              </Item>
              <Item onClick={toggleMute}>
                <>{videoRef.current.muted ? <span>Unmute</span> : <span>Mute</span>}</>
              </Item>
              <Item onClick={() => handleNext(videoprops.NextVideo)}>
                Next
              </Item>
              <Item onClick={handlePrevious}>
                Previous
              </Item>
            </>
          )}
          <Item onClick={handleCopyUrl}>
            Copy video Link
          </Item>
          <Separator />
          <Item disabled>Download Video</Item>
          <Separator />
          <Submenu disabled label="Repeat">
            <Item onClick={handleItemClick}>
              Repeat Once
            </Item>
            <Item onClick={handleItemClick}>Repeat All </Item>
            <Item onClick={handleItemClick}>Begin Playlist</Item>
          </Submenu>
        </Menu>
      </div>
    </>
  )
}

export default Watching