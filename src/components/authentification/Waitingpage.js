import {React,useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';

function Waitingpage() {
  const [logo, setLogo] = useState('/logo/TeramaFlixpic.png')

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const resp = await fetch('/logo/TeramaFlixpic.png');
        const blob = await resp.blob();
        setLogo(URL.createObjectURL(blob))
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchLogos()
  }, [])
  return (
    <>
    <div  className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
     <div  className="relative py-3 sm:max-w-xl sm:mx-auto">
       <div  className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div  className="image w-[100%] lg:w-[50%] h-max ">
                <div>
                <Image src={logo} width={280} height={280} alt="logo"  className="h-7 sm:h-8"/>
                </div>
                <div  className="divide-y divide-gray-200">
                  <div  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div  className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
                        <h2  className="text-2xl text-center font-bold mb-6">
                          The account has been created.
                          See the message we sent you to activate it in your e-mail box,
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

export default Waitingpage 