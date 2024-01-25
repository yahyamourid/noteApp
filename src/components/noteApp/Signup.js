import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaEye } from 'react-icons/fa'
import axios from 'axios'
const Signup = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [showpwd, setShopwd] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            const url = 'https://note-app-backend-iota.vercel.app/users/'
            const res = await axios.post(url, data)
            navigate('/login')

        } catch (error) {
            console.log(error.response.data.message)

            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError('')
                }, 2000);
            }
        }
    }
    const handleShowpwd = () => {
        setShopwd(!showpwd)
    }
    return (
    <div className='flex font-body bg-gradient-to-r from-[#fca311] items-center justify-center min-h-screen text-center'>
      <div className='flex   w-3/5  shadow-xl rounded-xl'>
        <div className='flex items-center flex-col bg-[#fca311] rounded-l-xl w-1/3'>
          <p className='font-bold text-4xl text-[#14213d] mb-8 mx-4 mt-20 '>Do you have an account?</p>
          <hr className='font-bold text-center border-4 border-[#14213d] mb-10 inline-block w-1/3' />
          <p className='font-semibold text-xl text-center text-[#14213d] mb-10 px-4'>sign in below</p>
          <Link to='/login'>
            <button className='text-lg text-[#fca311]  font-semibold  bg-[#14213d]  mx-auto px-6 py-2 rounded-2xl hover:text-[#fca311] hover:bg-[#13254B] hover:scale-105' >log in </button>
          </Link>
        </div>
        <div className='flex flex-col rounded-r-xl w-2/3 bg-white'>
          <p className='font-bold text-lg text-left  text-[#14213d] pt-2 pl-2 mb-10'>Note<span className='text-[#fca311]'>App</span></p>
          <p className='font-bold text-4xl  mb-10 text-center mx-auto text-[#14213d]'>Create new account</p>
          <div className='flex m-auto  w-2/3 '>
            <div className='flex items-center bg-[#e5e5e5]  w-3/7 py-2 rounded mb-3 mr-4'>
              <FaUser className='text-gray-400  ml-4 mr-2' />
              <input placeholder='FirstName'
                value={data.firstName}
                name='firstName'
                onChange={handleChange}
                className='outline-none bg-[#e5e5e5] text-lg font-medium w-2/3 text-gray-600'
              /></div>
            <div className='flex items-center bg-[#e5e5e5]  w-3/7 py-2 rounded mb-3 '>
              <FaUser className='text-gray-400  ml-4 mr-2' />
              <input placeholder='LastName'
                value={data.lastName}
                name='lastName'
                onChange={handleChange}
                className='outline-none bg-[#e5e5e5] text-lg font-medium w-2/3 text-gray-600'
              /> </div>
          </div >
          <div className='flex items-center bg-[#e5e5e5]  py-2 rounded mb-3 w-2/3 mx-auto'>
            <FaEnvelope className='text-gray-400  ml-4 mr-2' />
            <input placeholder='Email'
              value={data.email}
              name='email'
              onChange={handleChange}
              className='outline-none bg-[#e5e5e5] text-lg font-medium text-gray-600 w-3/4'
            /></div>
          <div className='flex items-center justify-between bg-[#e5e5e5]  py-2 rounded mb-3  w-2/3 mx-auto'>
            <div className='flex items-center'>
              <FaLock className='text-gray-400  ml-4 mr-2' />
              <input placeholder='Password'
                value={data.password}
                name='password'
                type={showpwd ? 'text' : 'password'}
                onChange={handleChange}
                className='outline-none bg-[#e5e5e5] text-lg font-medium text-gray-600'
              />
            </div>
            <button className='mr-4'>
              <FaEye className={showpwd ? 'text-[#FFB741] text-2xl': 'text-gray-400'} onClick={handleShowpwd} />
            </button>
          </div>



          {error && <div className='text-lg text-red-600 font-medium bg-red-200 mx-auto my-4 p-1 rounded w-3/5 '>{error}</div>}
          <button onClick={handleSubmit} className='text-lg text-[#14213d] mt-6 mb-16 font-semibold   bg-[#fca311] w-1/5 mx-auto px-6 py-2 rounded-2xl hover:text-[#fca311] hover:bg-[#14213d] hover:scale-105 '>
            signup
          </button>

        </div>

      </div>
            
             </div>
             <div className='absolute bottom-0 text-[#fca311] bg-[#14213d] text-lg w-full p-4 '>
          <p>&copy; Created by Yahya-Mourid</p>
      </div>
    </div>
    
    

  )
}

export default Signup
