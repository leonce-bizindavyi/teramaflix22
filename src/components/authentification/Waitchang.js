import {React,useState} from 'react'
import Link from 'next/link'

function Waitingchang () {
  
  return (
    <>
    <div  className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
     <div  className="relative py-3 sm:max-w-xl sm:mx-auto">
       <div  className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div  className="max-w-md mx-auto">
                <div>
                  <img src="/logo/TeramaFlixpic.png" alt="logo"  className="h-7 sm:h-8"/>
                </div>
                <div  className="divide-y divide-gray-200">
                  <div  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div  className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
                        <h2  className="text-2xl text-center font-bold mb-6">
                          The password change has been activated.
                          See the message we sent you to change it in your e-mail box,
                          but it may take some time.</h2>               
                      <div  className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                          <p>Return to Login  <Link href="/login"  className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">Log in </Link></p>
                        </div>
                    </div>
                  </div>
                </div>
         </div>
      </div>
     </div>
    </div>
    </>
  )
}

export default Waitingchang 