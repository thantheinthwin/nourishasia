import React, { useState, useEffect } from 'react'
import { LoginPic } from '../assets/img'
import { Typography } from '@material-tailwind/react'

import { app } from '../config/firebase.config'

import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, getAdditionalUserInfo, getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signInWithPopup, } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const Login = ({setAuth}) => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const [{user}, dispatch] = useStateValue();
    const [email, setEmail] = useState( window.localStorage.getItem("emailForSignIn") || "");

    // Function for logging in with Google Auth using firebase
    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            const details = getAdditionalUserInfo(userCred);
            // console.log(details.isNewUser);
            if(userCred){
                setAuth(true);
                window.localStorage.setItem("auth", "true");

                firebaseAuth.onAuthStateChanged((userCred) => {
                    // console.log(userCred)
                if(userCred){
                    dispatch({
                        type: actionType.SET_USER,
                        user: userCred
                    })
                    window.localStorage.setItem('uid', userCred.uid);
                    // Navigate the user to data entry form if the user is new to application
                    if(details.isNewUser){
                        window.localStorage.setItem('firstTime', 'true');
                        navigate("/login/form", {replace: true});
                    }
                    else{
                        window.localStorage.setItem('firstTime', 'false');
                        navigate("/home/recipes", {replace: true});
                    }
                }else{
                    setAuth(false);
                    dispatch({
                        type: actionType.SET_USER,
                        user: null,
                    })
                    navigate("/login");
                }
                })
            }
        }).catch((err) => {
        console.log(err);
        })
    }

    // Routing the user back to home screen if the user has already logged in
    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true"){
            navigate("/home/recipes", {replace: true})
        }
    }, [])

    // Function to handle the changes of input field of email
    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const actionCodeSettings ={
        url: "http://localhost:3000/home",
        handleCodeInApp: true,
    }

    // Function for logging in with email link
    const loginWithEmailLink = async () => {
        // If the user is re-entering their email but already has a code
        if(isSignInWithEmailLink(firebaseAuth, window.location.href) && !email){
            // Sign the user in
            signInWithEmailLink(firebaseAuth, email, window.location.href)
            .then(() => {
                setAuth(true);
                window.localStorage.setItem("emailForSignIn", "true");
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else{
            sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem("emailForSignIn", email);
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        // Get the saved email
        const saved_email = window.localStorage.getItem("emailForSignIn");
        // console.log(isSignInWithEmailLink(firebaseAuth, window.location.href));
        // Verify that the user went through the email link and the saved email is not null
        if(isSignInWithEmailLink(firebaseAuth, window.location.href) && !saved_email){
            signInWithEmailLink(firebaseAuth, email, window.location.href)
            .then(() => {
                setAuth(true);
                window.localStorage.setItem("auth", "true");

                firebaseAuth.onAuthStateChanged((userCred) => {
                if(userCred){
                    dispatch({
                        type: actionType.SET_USER,
                        user: userCred
                    })
                    navigate("/user/home/recipes", {replace: true})
                }else{
                    setAuth(false);
                    dispatch({
                        type: actionType.SET_USER,
                        user: null,
                    })
                    navigate("/login");
                }
                })
                window.localStorage.removeItem('emailForSignIn');
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])

  return (
    <div className='flex flex-col w-screen h-screen lg:flex-row'>
        <img src={LoginPic} alt="tea-leaf-salad" className='object-cover object-top w-full h-[calc(30vh-1rem)] lg:h-full lg:w-2/5' loading='lazy'/>
        <div className='grid gap-2 p-4 m-auto lg:gap-4 lg:self-center lg:h-auto lg:w-1/4'>
            <Typography variant='h1' className='text-primary font-logo'>Nourishasia</Typography>
            <Typography variant='h4'>Sign in or create an account</Typography>
            <label htmlFor='email' className='mt-10 text-sm text-gray-500'>Email</label>
            <input type='email' id='email' className='w-full p-2 border border-black outline-none focus:ring-0 focus:ring-offset-0' value={email} onChange={(e) => handleChange(e)}></input>
            <div
                className="relative flex items-center justify-center w-full gap-2 px-4 py-4 text-white transition-all duration-500 ease-in-out bg-black border border-black cursor-pointer select-none hover:bg-gray-800 hover:border-gray-800 lg:py-2"
                onClick={loginWithEmailLink}
            >
                Continue with Email
            </div>
            <fieldset className="border-t border-gray-400">
                <legend className="px-4 mx-auto text-sm italic text-gray-400">or</legend>
            </fieldset>
            <div
                className="relative flex items-center justify-center w-full gap-2 px-4 py-4 transition-all duration-500 ease-in-out border border-black cursor-pointer select-none hover:bg-black hover:text-white lg:py-2"
                onClick={loginWithGoogle}
            >
                <FcGoogle className="absolute text-2xl left-6" />
                Sign in with Google
            </div>
        </div>
    </div>
  )
}

export default Login