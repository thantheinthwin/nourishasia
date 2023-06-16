import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'

import { Home, LandingPage, LoginPage } from './pages'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user}, dispatch] = useStateValue();

  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");

  const location = window.location.href.split("/");
  // console.log(window.location.href.split("/")[3]);

  // Restricting the user from getting access to home page without signing in
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if(userCred){
        userCred.getIdToken().then((data) => {
          setAuth(true);
          dispatch({
            type: actionType.SET_USER,
            user: data,
          })
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

  // Routing the user back to home screen if the user has already logged in
  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true"){
        navigate("/home", {replace: true})
    }else{
      navigate('/', {replace: true})
    }
  }, [])

  return (
    <div>
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage setAuth={setAuth}/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </AnimatePresence>
    </div>
  )
}

export default App
