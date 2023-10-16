import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function User({user}) {
  return (
    <>
      <Link href={`/dashboard/users?user=${user.uniid}`}>
        <div  className="user1 flex flex-row justify-between items-center px-6 mb-6 cursor-pointer">
            <div  className="flex flex-row items-center space-x-3">
                <div  className=" w-10 h-10 xl:w-12 xl:h-12 rounded-full overflow-hidden">
                {
                  user.Photo ?
                  <Image width={100} height={100} src={`/Thumbnails/${user.Photo}`}  className="" alt=""/>
                  :
                  <Image width={100} height={100} src="/img/logo.png"  className="" alt=""/>
                }
                </div>
                <div  className="flex flex-col">
                    <h1  className="font-semibold">{user.PageName} </h1>
                </div>
            </div>
        </div>
      </Link>
    </>
  )
}

export default User