import React from 'react'
import SwipperSlide from './SwipperSlide'
import Videos from './Videos'
function Home() {
  return (
    <>
        <div className="w-full flex flex-col"> 
          <SwipperSlide />
          <Videos />
        </div>
    </>
  )
}
export default Home