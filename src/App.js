import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'

import { Home, LandingPage, LoginPage, UserDataEntryForm } from './pages'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user}, dispatch] = useStateValue();

  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");

  // Restricting the user from getting access to home page without signing in
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if(userCred){
        setAuth(true);
        dispatch({
          type: actionType.SET_USER,
          user: userCred,
        })
      }
      else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        })
        window.localStorage.setItem("auth", "false");
      }
    })
  }, []);

  // Routing the user back to landing page if the user has already logged in
  useEffect(() => {
    if(window.localStorage.getItem("auth") === "false"){
        navigate("/", {replace: true})
    }
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage setAuth={setAuth}/>}/>
        <Route path='/home/*' element={<Home/>}/>
        <Route path='/login/form' element={<UserDataEntryForm/>}/>
      </Routes>
    </AnimatePresence>
    </LocalizationProvider>
  )
}

export default App
