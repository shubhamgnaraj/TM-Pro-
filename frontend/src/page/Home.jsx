import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-teal-400 to-green-400 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="fancyGradient" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#fancyGradient)" />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 py-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl text-center animate-pulse">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-blue-200">
            Empower <span className="text-purple-300">Managers</span> & <span className="text-green-200">Employees</span>
            <br />
            with <span className="text-purple-100">Task Manager Pro+</span>
          </span>
        </h1>
        <p className="mt-10 text-xl md:text-sm font-medium text-white/90 text-center max-w-lg shadow-2xl rounded-2xl bg-white/20 backdrop-blur-md px-10 py-8 border border-white/20">
          <span className='text-2xl'>Seamlessly assign, track, and complete tasks together.</span><br />
          <span className="text-purple-200 font-bold text-xl">Managers</span> can delegate and monitor progress, while <span className="text-green-200 font-bold text-xl">Employees</span> stay focused and organized.<br /><br />
          <span className="text-white font-semibold">Boost your team's productivity with clarity and collaboration.</span>
        </p>
        <div className="mt-12 flex flex-col md:flex-row gap-6">
          <Link to="/manager/login" className="bg-gradient-to-r from-purple-300 to-green-300 text-white rounded-full font-bold py-3 px-8  shadow-lg transition-all duration-200 text-lg">
            Get Started as Manager
          </Link>
          <Link to="/employee/login" className="bg-gradient-to-r from-purple-300 to-green-300 text-white rounded-full font-bold py-3 px-8  shadow-lg transition-all duration-200 text-lg">
            Get Started as Employee
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
