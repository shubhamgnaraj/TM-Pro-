import React from 'react'
import Navbar from './Navbar'

function Home() {
  return (
    <div className='bg-gradient-to-br from-blue-500 via-teal-400 to-green-500 w-full h-screen'>
      <Navbar />
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <div className="flex flex-col gap-y-5 items-center justify-center mb-20">
          
          <h1 className='text-7xl font-extrabold capitalize text-white drop-shadow-lg'>
            Task Manager Pro+
          </h1>
          <p className='text-base font-medium text-white mt-5 text-center max-w-lg opacity-90'>
            Boost your productivity with Task Manager Pro+, the smartest way to organize, track, and complete tasks efficiently.
          </p>
          <a 
            className=' bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
            href="/auth/login"
          >
            Log-In
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
