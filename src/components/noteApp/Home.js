import React from 'react'
import { FaSearch, FaSignOutAlt, FaSave, FaSpinner, FaTrash, FaPen, FaTimes, FaArrowLeft, FaEdit   } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [user, setUser] = useState({})
  const [note, setNote] = useState({
    title: '',
    content: ''
  })
  const [error, setError] = useState('')
  const url = 'https://note-app-backend-iota.vercel.app'
  const storedToken = JSON.parse(localStorage.getItem('token'))
  const [modal, setModal] = useState(false)
  const [noteId, setNoteId] = useState('')
  const [updateMode, setUpdateMode] = useState(false)


  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  const fetchNotes = async () => {
    setLoading(true)
    const rep = await axios.get(`${url}/notes/user/${storedToken.id}`)
    setData(rep.data)
    setTimeout(() => {
      setLoading(false)
    }, 400)

  }

  useEffect(() => {

    fetchNotes()
    getUser()

  }, [])

  const handleInput = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const getUser = async () => {
    setLoadingUser(true)
    const rep = await axios.get(`${url}/users/${storedToken.id}`)
    setUser(rep.data)
    setTimeout(() => {
      setLoadingUser(false)
    }, 1500)
  }

  const showModal = (btnValue) => {
    setModal(true)
    setNoteId(btnValue)
  }
  const closeModal = () => {
    setModal(false)
    setNoteId('')
  }


  const handleAdd = async () => {
    const noteData = { ...note, ['idUser']: storedToken.id }
    try {
      const rep = await axios.post(`${url}/notes`, noteData)
      fetchNotes();
      console.log(rep)
      setNote({
        title: '',
        content: ''
      })

    } catch (error) {
      console.log(error.response.data.message)


      setError(error.response.data.message);
      setTimeout(() => {

        setError('')
      }, 2000);


    }

  }
  const notify = (ob,op) => toast.success(`${ob} ${op} successfully`, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",

  });
  const deleteNote = async () => {
    try {
      const rep = await axios.delete(`${url}/notes/${noteId}`)
      notify('Note','deleted')
      fetchNotes()
      closeModal()


    } catch (error) {
      console.log(error.response.data.message)


      setError(error.response.data.message);
      setTimeout(() => {

        setError('')
      }, 2000);
    }

  }

  const handlePen = (title, content, id) => {
    setNote({ 'title': title, 'content': content })
    setUpdateMode(true)
    setNoteId(id)
  }
  const updateNote = async () => {
    try {
      const rep = await axios.put(`${url}/notes/${noteId}`, note)
      notify('note','updated')
      fetchNotes();

      setNote({
        title: '',
        content: ''
      })
      setNoteId('')
      setUpdateMode(false)

    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.message);
      setTimeout(() => {

        setError('')
      }, 2000);


    }
  }
  //////////////user's profile//////////////////
  const [down, setDown] = useState(false)
  const [userMode, setUserMode] = useState(false)
  const [user1, setUser1] = useState([])
  const [pwdMode, setPwdMode] = useState(false)
  const [pwd, setPwd] = useState({
    password:'',
    newPassword:''
  })
  const handleDown = () => {
    setDown(!down)
  }

  const handleUserMode = () => {
    handleDown()
    setUserMode(true)
    setUser1(user)
    
  }

  const quitUserMode = () => {
    setUserMode(false)
    setPwdMode(false)
    setPwd({
      password:'',
      newPassword:''
    })
  }

  const handleInputUser = (e) => {
    setUser1({ ...user1, [e.target.name]: e.target.value })
  }

  const updateUser = async () => {
    try {
      const rep = await axios.put(`${url}/users/${user._id}`, user1)
      notify('user','updated')
      getUser()

    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.message);
      setTimeout(() => {

        setError('')
      }, 2000);


    }
  }

  const handlePwdMode = () => {
    setPwdMode(!pwdMode)
    setPwd({
      password:'',
      newPassword:''
    })
  }

  const handlePwdInput = (e) => {
    setPwd({...pwd,[e.target.name]:e.target.value})
  }

  const updatePwd = async () => {
    try {
      const rep = await axios.put(`${url}/users/pwd/${user._id}`, pwd)
      setPwd({
        password:'',
        newPassword:''
      })
      notify('password','updated')

    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.message);
      setTimeout(() => {

        setError('')
      }, 2000);


    }
  }

  const deleteUser = async() => {
    try {
      const rep = await axios.delete(`${url}/users/`, {
        headers: {
          Authorization: `Bearer ${storedToken.token}`, // Remplacez yourTokenHere par le vrai jeton JWT
        },
      });
     handleLogout()

    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.message);
      setTimeout(() => {

        setError('')
      }, 2000);


    }
  }

  return (
    <div className='font-body'>
      <div className='flex justify-between items-center py-7 px-6 shadow max-h-20 min-h-20'>
        <p className='font-extrabold text-3xl  text-[#14213d] mr-6 '>Note<span className='text-[#fca311]'>App</span></p>

        <div className='flex items-center'>
          {loadingUser ? (
            <p className='font-semibold text-[#14213d] text-3xl bg-[#FFB741]  rounded-full ml-20 uppercase h-16 w-16 items-center justify-center flex py-auto border-2 border-[#14213d]'><FaSpinner className='animate-spin' /></p>
          ) : (
            user.firstName && user.lastName ? (
              <>
                <button onClick={handleDown} className='font-semibold text-[#14213d] text-xl bg-[#FFB741]  rounded-full ml-20 uppercase h-16 w-16 items-center justify-center flex py-auto border-2 border-[#14213d]'>
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </button>

                {down && <div className='absolute mt-32  right-11 bg-white rounded-md py-1 px-3'>
                  <button onClick={handleUserMode} className='rounded-md hover:bg-gray-100 py-1 px-3'>
                    Profile
                  </button>
                </div>}
              </>
            ) : (

              <p className='font-semibold text-[#14213d] text-xl bg-[#FFB741]  rounded-full ml-20 uppercase h-16 w-16 items-center justify-center flex py-auto border-2 border-[#14213d]'><FaSpinner className='animate-spin' /></p>
            )
          )}

          <button onClick={handleLogout} className='text-[#14213d] ml-4 text-xl'>
            <span title='logout'><FaSignOutAlt /></span></button>

        </div>

      </div>
      {!userMode ?
        <div className=' flex bg-[#e5e5e5] flex-col items-center min-h-screen '>
          <div className='flex flex-col bg-white w-2/5 mt-8 rounded-md py-4 shadow-md'>
            <label className='text-gray-700 font-medium mb-1 ml-14'>
              Title
            </label>
            <input type='text'
              name='title'
              placeholder='input title'
              className='rounded bg-[#e5e5e5] w-2/5 p-1 outline-none text-gray-600 mb-3 ml-14'
              onChange={handleInput}
              value={note.title} />

            <label className='text-gray-700 font-medium mb-1 ml-14'>
              Content
            </label>
            <textarea
              name='content'
              placeholder='input content'
              className='rounded bg-[#e5e5e5] w-4/5 p-1 outline-none text-gray-600 mb-3 min-h-20 ml-14'
              onChange={handleInput}
              value={note.content} />

            {error && <div className='text-lg text-red-600 font-medium bg-red-200 mx-auto my-4 p-1 rounded w-3/5 flex justify-center items-center text-center ' >{error}</div>}
            {!updateMode ?
              <button className='flex items-center justify-center bg text-lg text-[#14213d] my-2 font-semibold   bg-[#fca311] w-1/5 mx-auto px-6 py-2 rounded-2xl hover:text-[#fca311] hover:bg-[#14213d] hover:scale-105'
                onClick={handleAdd}>
                <FaSave className='mr-2' />
                Add
              </button> : <button className='flex items-center justify-center bg text-lg text-[#14213d] my-2 font-semibold   bg-[#fca311] w-1/5 mx-auto px-6 py-2 rounded-2xl hover:text-[#fca311] hover:bg-[#14213d] hover:scale-105'
                onClick={updateNote}>
                <FaSave className='mr-2' />
                Update
              </button>
            }
          </div>
          <div className='w-full flex items-center justify-center mx-4 my-8'>
            {loading ? <p className='mt-2 font-semibold text-xl flex items-center'>Loading <FaSpinner className='ml-4 animate-spin' /></p> :

              (data.length === 0 ? <p className='mt-2 font-semibold text-xl flex items-center'>No notes available</p> :
                <div className=' grid grid-cols-4 w-4/5 items-start justify-center '>
                  {
                    data.map((note, index) => (
                      <div className='flex flex-col bg-white shadow w-1/7 mx-2 p-4 rounded-md mb-4'>
                        <div className='flex items-center justify-between mt-2 w-6/7'>
                          <p className='text-lg font-semibold uppercase'>{note.title}</p>
                          <button onClick={() => handlePen(note.title, note.content, note._id)}>
                            <FaPen className='text-lg text-gray-400 hover:scale-125  hover:text-gray-500 ' />
                          </button>
                        </div>
                        <p className='my-3 w-6/7 bloc break-words '>{note.content}</p>
                        <div className='flex items-center justify-between mb-2 w-6/7'>
                          <p className='text-gray-400'>{note.createdAt.slice(0, -5)}</p>
                          <button onClick={() => showModal(note._id)} >
                            <FaTrash className='text-lg text-gray-400 hover:scale-125  hover:text-gray-500' />

                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )

            }
          </div>


        </div> :
        <div className=' flex bg-[#e5e5e5] flex-col  min-h-screen items-center '>
          <button onClick={quitUserMode} className='absolute left-10 text-3xl my-3 p-3 text-[#14213d]'><FaArrowLeft /></button>
          <div className='flex flex-col bg-white w-1/3 mt-20 rounded-md p-3'>
            <p className='text-3xl mx-auto font-bold text-[#14213d] my-4'>Edit your profile</p>
            {!pwdMode ?
              <div className='flex flex-col px-14'>
                <label className='text-gray-700 font-medium mb-1 '>FirstName </label>
                <input type='text' placeholder='FirstName' value={user1.firstName} name='firstName' onChange={handleInputUser}
                className='rounded bg-[#e5e5e5] w-2/5 p-1 outline-none text-gray-600 mb-3 ' />
                <label className='text-gray-700 font-medium mb-1 '>LastName </label>
                <input type='text' placeholder='LastName' value={user1.lastName} name='lastName' onChange={handleInputUser} 
                className='rounded bg-[#e5e5e5] w-2/5 p-1 outline-none text-gray-600 mb-3'/>
                <label className='text-gray-700 font-medium mb-1 '>Email </label>
                <input type='text' readOnly placeholder='Email' value={user1.email} name='email' onChange={handleInputUser}
                className='rounded bg-[#e5e5e5] w-4/5 p-1 outline-none text-gray-600 mb-3 ' />
                <label className='text-gray-700 font-medium mb-1 '>Password </label>
                <div className='flex justify-between w-3/5 '>
                  <input type='password' readOnly value='yrrfry7hr' name='password' 
                  className='rounded bg-[#e5e5e5]  p-1 outline-none text-gray-600 mb-3'/>
                  <button className=' text-gray-600 mb-3 ml-12 text-lg hover:text-sky-600' onClick={handlePwdMode}><FaEdit/></button>
                </div>

              </div>
              :
              <div className='flex flex-col px-14'>
                <button onClick={handlePwdMode} className='text-[#14213d] mb-2'><FaArrowLeft /></button>
                <label className='text-gray-700 font-medium mb-1 '>Password</label>
                <input name='password' value={pwd.password} onChange={handlePwdInput} placeholder='input old password' type='password'
                 className='rounded bg-[#e5e5e5]  p-1 outline-none text-gray-600 mb-3'></input>
                <label className='text-gray-700 font-medium mb-1 '>New password</label>
                <input name='newPassword' value={pwd.newPassword} onChange={handlePwdInput} placeholder='input new password' type='password'
                 className='rounded bg-[#e5e5e5]  p-1 outline-none text-gray-600 mb-3'></input>
              </div>
            }

            {error && <div className='text-lg text-red-600 font-medium bg-red-200 mx-auto my-4 p-1 rounded w-3/5 flex justify-center items-center text-center '>{error}</div>}
            <div className='flex mx-auto my-4'>
            <button onClick={!pwdMode ? updateUser : updatePwd} className='text-lg font-semibold mx-1 py-2 px-5 rounded-md bg-gray-100 text-black hover:bg-gray-200'> update </button>
            <button onClick={showModal} className='text-lg mx-2 font-semibold py-2 px-5 rounded-md bg-red-500 text-white hover:bg-red-600'> Delete </button>
            </div>
           
          </div>
          


        </div>
      }
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        className='flex flex-col  bg-white w-1/4 mx-auto mt-48 rounded-md shadow border-2'
      >


        <button className='flex items-center justify-end mt-3 mr-3' onClick={closeModal}><FaTimes /></button>
        <p className='text-center text-2xl font-bold mt-10 mb-8 '>Do you want to delete  {userMode ? 'your account' :'this note'} ?</p>
        <div className='flex justify-center mb-10 '>
          <button onClick={closeModal} className='text-lg font-semibold mx-1 py-2 px-5 rounded-md bg-gray-100 text-black hover:bg-gray-200'>Cancel</button>
          <button onClick={!userMode ? deleteNote: deleteUser} className='text-lg mx-2 font-semibold py-2 px-5 rounded-md bg-red-500 text-white hover:bg-red-600' >Delete</button>
        </div>

      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     
    </div>
  )
}

export default Home
