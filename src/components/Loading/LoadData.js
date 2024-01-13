import React from 'react'
import Data from './Data'

function LoadData() {
  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mx-0 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 items-center '>
      <div className={`mx-auto w-[100%]`}>
        <Data />
      </div>
      <div className={` mx-auto w-[100%]`}>
        <Data />
      </div>
      <div className={`mx-auto w-[100%]`}>
        <Data />
      </div>
      <div className={`mx-auto w-[100%]`}>
        <Data />
      </div>
    </div>
        
    </>
  )
}

export default LoadData