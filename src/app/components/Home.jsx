'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import {signOut} from 'next-auth/react'

const Home = async() => {
 
  const {data: session} = useSession()

  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6'>
           <h1>Name: <span className='font-bold '>{session?.user?.name}</span></h1> 
           <h1>Email: <span className='font-bold '>{session?.user.email}</span></h1> 
            <button onClick={()=> signOut({callbackUrl: "/"})} className='font-bold px6 py-2 bg-red-700 mt-3 text-white'>Log Out</button>
        </div>
    </div>
  )
}

export default Home