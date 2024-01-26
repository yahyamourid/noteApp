import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FiMail, FiKey, FiEye } from 'react-icons/fi'
import {FaSpinner} from 'react-icons/fa'

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState('')
  const [submit, setSubmit] = useState(false)

  const [showpwd, setShopwd] = useState(false)

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      setSubmit(true)
      const url = 'https://note-app-backend-iota.vercel.app/users/auth'
      const res = await axios.post(url, data)
      localStorage.setItem("token", JSON.stringify(res.data));
      
      
      window.location = "/";
    } catch (error) {
      console.log(error.response.data.message)
      if (error.response.status == 401){
        setError(error.response.data.message)
        setTimeout(() => {
          setError('');
        }, 2000);
      }
      else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message.message);
        setTimeout(() => {
          setError('');
        }, 2000);
      
      }

    }
  }

  const handleShowpwd = () => {
    setShopwd(!showpwd)
  }
  return (
    <div className='flex  bg-gradient-to-r from-[#fca311] font-body items-center justify-center min-h-screen text-center'>
      <div className='flex   w-3/5  shadow-xl rounded-xl '>
        <div className='flex  bg-white  flex-col w-2/3 rounded-l-xl '>
          <p className='font-bold text-lg text-left  text-[#14213d] pt-2 pl-2 mb-10'>Note<span className='text-[#fca311]'>App</span></p>
          <p className='font-semibold text-2xl text-left pl-10 mb-2 text-[#fca311]'>Hello,</p>
          <p className='font-bold text-4xl pl-10 mb-10  text-left text-[#14213d]'>Welcome back!</p>
          <div className='flex  items-center bg-[#e5e5e5] w-3/5  py-2  m-auto rounded mb-3 '>
            <FiMail className='text-gray-400  ml-4 mr-2' />
            <input placeholder='email'
              name='email'
              value={data.email}
              onChange={handlechange}
              className='outline-none bg-[#e5e5e5] text-lg font-medium text-gray-600 w-3/4'
            />
          </div>
          <div className='flex justify-between items-center bg-gray-200 w-3/5  py-2  m-auto rounded mb-4'>
            <div className='flex items-center'>
            <FiKey className='text-gray-400 ml-4  mr-2' />
            <input placeholder='password'
              name='password'
              value={data.password}
              onChange={handlechange}
              className='outline-none bg-gray-200 text-lg font-medium text-gray-600'
              type={showpwd ? 'text': 'password'}
            />
            </div>
            
            <button className='mr-4'>
            <FiEye className={showpwd ? 'text-[#FFB741] text-2xl': 'text-gray-400'} onClick={handleShowpwd}/>
            </button>
           
          </div>

          {error && <div className='text-lg text-red-600 font-medium bg-red-200 mx-auto my-2 w-full  rounded w-6/7 ' >{error}</div>}
         
          <button onClick={handleSubmit} className='text-lg text-[#14213d] mb-20 font-semibold   bg-[#fca311] w-1/5 mx-auto px-6 py-2 rounded-2xl hover:text-[#fca311] hover:bg-[#14213d] hover:scale-105 '>
            {!submit ? 'login' : 
            <FaSpinner className='animate-spin' />}
          </button>

        </div>
        <div className='flex  items-center justify-center flex-col w-1/3 bg-[#fca311] rounded-r-xl'>
          <p className='font-bold text-4xl text-center text-[#14213d] mb-10'>Create account</p>
          <hr className='font-bold text-center border-4 border-[#14213d] mb-10 inline-block w-1/3' />
          <p className='font-semibold text-xl text-center text-[#14213d] mb-10 px-4'>Full up personnel information and start journy with us</p>
          <Link to='/signup'><button className='text-lg text-[#fca311]  font-semibold  bg-[#14213d]  mx-auto px-6 py-2 rounded-2xl hover:text-[#fca311] hover:bg-[#13254B] hover:scale-105 '>signup</button></Link>

        </div>
        
      </div>
             <div className='absolute bottom-0 text-[#fca311] bg-[#14213d] text-lg w-full p-4 '>
          <p>&copy; Created by Yahya-Mourid</p>
      </div>
    </div>
  )
}

export default Login
