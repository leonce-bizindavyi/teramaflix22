import React from 'react'
import SwipperSlide from './SwipperSlide'
import Videos from './Videos'
function Home({videos}) {
  return (
    <>
        <div className="w-full flex flex-col"> 
          <SwipperSlide videos={videos} />
          <Videos />
        </div>
    </>
  )
}
export default Home