// Importez les composants nécessaires
import Title from '@/components/Title';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function NotFound() {
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
      <Title title="404 Not Found" />
      <div className="bg-gradient-to-br from-teal-500 via-indigo-500 to-purple-500 text-white h-screen flex items-center justify-center">
        <div className="text-center p-8 rounded-md bg-white shadow-md">
          <div className="flex items-center justify-center mb-4">
            <Image src={logo} width={280} height={280} alt="Play Icon" className="mr-2 h-14" />
            <h1 className="text-6xl font-bold text-indigo-800">404</h1>
          </div>
          <p className="text-lg mt-4 text-black">Oops! It seems like you &apos; ve entered a wrong galaxy.</p>
          <Link href="/" >
            <div className='flex items-center justify-center'>
              <span className="text-purple-500 block mt-6 bg-blue-400 py-3 w-[8rem]">Go Back Home</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;

NotFound.getLayout = function pageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
