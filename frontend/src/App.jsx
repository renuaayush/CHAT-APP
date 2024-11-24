import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

import Homepage from './pages/Homepage';
import Signuppage from './pages/Signuppage';
import Loginpage from './pages/Loginpage';
import Settingspage from './pages/Settingspage';
import Profilepage from './pages/Profilepage';
import { useAuthStore } from './store/useAuthstore';
import {Loader} from "lucide-react"
import { useThemeStore } from './store/useThemeStore';
// import { axiosinstance } from './lib/axios';


const App = () => {

 const {authUser,checkAuth,ischeckingAuth, onlineUsers} =  useAuthStore()

  console.log({onlineUsers});

  const{theme} = useThemeStore()




 useEffect(() =>{
  checkAuth();

 },[checkAuth,])
 console.log(authUser)

 if(ischeckingAuth && !authUser) return(
  <div className='flex items-center justify-center h-screen'>
    <Loader className="size-10 animate-spin"/>
  </div>
 )
  
  return (
    
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <Homepage/> :<Navigate to="/login"/>}></Route>
        <Route path="/signup" element={!authUser ?<Signuppage/>:<Navigate to="/"/>}></Route>
        <Route path="/login" element={!authUser ?<Loginpage/>:<Navigate to="/"/>}></Route>
        <Route path="/settings" element={<Settingspage/>}></Route>
        <Route path="/profile" element={authUser ?<Profilepage/>:<Navigate to="/login"/>}></Route>
      </Routes>

      <Toaster/>

    </div>

    
  )
}

export default App