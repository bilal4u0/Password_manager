import React from 'react'
import { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";


const App = () => {
  const navigate = useNavigate();

  const [isLogin, setisLogin] = useState(false)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [message, setMessage] = useState("");

  const handleclickEmail = (e) => {
    setEmail(e.target.value)

  }

  const handleclickPassword = (e) => {
    setPassword(e.target.value)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Email.includes("@")) {
      setMessage("Email should contain @")
      return;
    }

    try {

      let url = (isLogin) ? 'http://localhost:3000/login' : 'http://localhost:3000/registered';
      let send = await fetch(url, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: Email,
          password: Password
        })
      })
      const data = await send.json()
      setMessage(data.message)

      // Clear form fields after successful registration
      if (!isLogin && data.success) {
        setEmail("")
        setPassword("")
      }

      if (isLogin && data.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/loginusers");
      }
     

    } catch (error) {
      console.log("sOMETHING WENT WRONG", error)
    }
  }


  return (
    <>


      <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex justify-center items-center p-4 sm:p-6'>
        <div className='bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg'>
          <div className='text-center mb-6 sm:mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2'>Welcome</h1>
            <p className='text-gray-600 text-sm sm:text-base'>Choose your action below</p>
          </div>

          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8'>
            <button
              className={`flex-1 py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${!isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => {
                setisLogin(false)
                setEmail("")
                setPassword("")
                setMessage("")
              }}
            >
              Register
            </button>
            <button
              className={`flex-1 py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${isLogin
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => {
                setisLogin(true)
                setEmail("")
                setPassword("")
                setMessage("")
              }}
            >
              Login
            </button>
          </div>

          <div className='text-center mb-5 sm:mb-6'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2'>
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className='text-gray-600 text-sm sm:text-base'>
              {isLogin ? 'Sign in to your account' : 'Join us today'}
            </p>
          </div>

          {message && (
            <div className={`mb-5 sm:mb-6 p-3 sm:p-4 rounded-lg text-center font-medium text-sm sm:text-base ${message.includes('successfully')
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
              }`}>
              {message}
            </div>
          )}

          <form className='space-y-5 sm:space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2'>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder='Enter your email'
                value={Email}
                onChange={(e) => handleclickEmail(e)}
                className='w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none text-sm sm:text-base'
              />
            </div>

            <div>
              <label htmlFor="password" className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2'>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder='Enter your password'
                value={Password}
                onChange={(e) => handleclickPassword(e)}
                className='w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none text-sm sm:text-base'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className='mt-6 sm:mt-8 text-center'>
            <p className='text-gray-500 text-xs sm:text-sm'>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setisLogin(!isLogin)
                  setEmail("")
                  setPassword("")
                  setMessage("")
                }}
                className='text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200'
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
