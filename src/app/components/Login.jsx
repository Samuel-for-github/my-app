'use client'
import React, { useState } from 'react'
import Link from "next/link"
import {signIn} from "next-auth/react"
import axios  from 'axios'
import { useRouter } from 'next/navigation'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const router = useRouter(); 

  const handleSubmit = async(e)=>{
    e.preventDefault();
  
    try {
     const res = await signIn('credentials', {email, password, redirect: false})
      if (res.error) {
        setError("Invalid Crdentials")
        return;
      }
      router.replace("/home")
      
    } catch (error) {
      console.log(error);
    }
     
  }


 
  return (
    <div className="grid place-items-center h-screen">
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-blue-400'>
        <h1 className='text-xl font-bold my4'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-3'>
        <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" />
        <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className='bx-6 py-2 rounded-md bg-blue-600 text-slate-200 font-bold cursor-pointer'>Login</button>

        {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>}
        <Link className='text-sm mt-3 text-right' href={'/register'}>
        Dont't have an account? <span className='underline'>Register</span>
        </Link> 
      </form>
      </div>
    </div>
  )
}

export default Login