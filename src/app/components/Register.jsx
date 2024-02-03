"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios  from "axios";
import { useRouter } from "next/navigation";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter();

  // console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    e.target.reset();
    if (!name || !email || !password) {
      setError("All fields are neccesary")
      return;
    }

    try {
      
      try {
        const res = await axios.post("api/userExist", {email})
        const existingEmail = res.data.emailData;
        if (existingEmail) {
         setError("User already exist")
         return;
        }
      } catch (error) {
        
      }
       
     await axios.post("api/register", {name, email, password})
     setError("")

    } catch (error) {
      
    }
    router.push("/")
  }


  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="text-2xl font-bold my4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
          <input onChange={(e)=> setName(e.target.value)} type="text" placeholder="Username" />
          <input onChange={(e)=> setEmail(e.target.value)}  type="email" placeholder="Email" />
          <input  onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
          <button className="bx-6 py-2 rounded-md text-lg bg-blue-600 text-slate-200 font-bold cursor-pointer">
            Register
          </button>

    {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>}
          
          <Link className="text-md mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
