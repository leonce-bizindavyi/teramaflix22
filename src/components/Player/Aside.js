import React,{useContext} from 'react'
import Videos from './Videos'
import CommentBloc from './CommentBloc'
import { VideoContext } from '../context/video'

function Aside() {
  const {video} = useContext(VideoContext)
  return (
    <>
    <aside className="comment lg:w-[35%] sm:mx-4  lg:ml-4   flex-col space-y-10 relative overflow-hidden">
      <CommentBloc video={video} />
      <Videos />
    </aside>
    </>
  )
}

export default Aside