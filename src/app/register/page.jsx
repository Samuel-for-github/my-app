import React from 'react'
import Register from '../components/Register'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
const page = async() => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/home')
  }
  return (
    <Register/>
  )
}

export default page