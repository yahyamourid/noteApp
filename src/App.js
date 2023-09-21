import React from 'react';
import Home from './components/noteApp/Home';
import Login from './components/noteApp/Login'
import Signup from './components/noteApp/Signup'
import { Routes, Route, Navigate } from 'react-router-dom';


const App = () => {
  const user = localStorage.getItem("token")
  console.log(user)
  return (
    <>
    <Routes>
      {user && < Route path='/' exact element={<Home/>}/>}
      <Route path='/'  element ={<Navigate replace to="/login"/>}/>
      <Route path='/login' exact element ={<Login/>}/>
      <Route path='/signup' exact element ={<Signup/>}/>
    </Routes>
     
    </>
  )
};

export default App;
