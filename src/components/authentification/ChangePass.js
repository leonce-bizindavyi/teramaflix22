import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
function ChangePass() {
  return (
    <>
      <div  className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div  className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div  className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

    <div  className="max-w-md mx-auto">
        <div>
          <Image src="/logo/TeramaFlixpic.png"  width={80} height={80} alt="logo"  className="h-7 sm:h-8"/>
        </div>
        <div  className="divide-y divide-gray-200">
          <div  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div  className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
                <h2  className="text-2xl text-center font-bold mb-6">Send your Email Address</h2>
                <div  className="mb-4">
                    <label  className="block text-gray-700 font-bold mb-2" for="email">
                    E-mail
                    </label>
                    <input name="mail"  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" 
                    type="email" placeholder="enter your email" />
                    <span  className="">  </span>
                </div>
                <Link href='/resetpass'  className="mb-6">
                    <button name="changemod"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Send Link
                    </button>
                </Link>
            </div>
          </div>
          <div  className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>Return to Login  <Link href="/login"  className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">Log in !</Link></p>
          </div>
        </div>
      </div>
        </div>
       </div>
      </div>
    </>
  )
}

export default ChangePass