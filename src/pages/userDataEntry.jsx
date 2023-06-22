import React, { useEffect, useState } from 'react'
import { Card, CardBody, Input, Select, Option, Typography, Button } from '@material-tailwind/react'
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers'

import { getAuth } from 'firebase/auth'
import { app, db } from '../config/firebase.config'
import { setDoc, serverTimestamp, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const UserDataEntry = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    birthday: '',
    height: undefined,
    weight: undefined,
    gender: '',
    savedRecipes: []
  })
  
  // console.log(userData)
  // console.log(typeof(firebaseAuth.currentUser?.uid))

  const handleGenderChange = (e) => {
    const newData = {...userData};
    newData['gender'] = e;
    setUserData(newData);
  }

  const handleDatePickerChange = (e) => {
    const newData = {...userData};
    newData['birthday'] = e.$d;
    setUserData(newData);
  }

  const handleChange = (e) => {
    const newData = {...userData};
    const {name, value} = e.target;
    newData[name] = value;
    setUserData(newData);
  }

  const saveUserData = async (data) => {
    data.createdAt = serverTimestamp();
    data.updatedAt = null;
    const uid = firebaseAuth.currentUser?.uid;

    try {
      await setDoc(doc(db, 'users', uid), data);
      navigate("/home/recipes", {replace: true})
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  // preventing the user from re-entering the data in useDataEntry page
  useEffect(() => {
    if(window.localStorage.getItem('firstTime') === 'false'){
      navigate("/home/recipes", {replace: true});
    }
  }, [])

  return (
    <div className='flex w-full h-screen bg-secondary'>
        <Card className='grid w-11/12 gap-2 m-auto lg:w-fit h-fit'>
            <CardBody className='grid gap-2'>
                <Typography variant='h5'>Welcome to <span className='text-2xl font-bold font-logo text-accent'><span className='text-3xl'>N</span>ourishAsia</span> !</Typography>
                <Typography variant='small' className='text-blue-gray-500'>To offer personalized nutritional advice, we kindly request some information. Please answer the following questions:</Typography>
                <form className='grid gap-3 my-2'>
                  <Input type='text' name='name' label='Name' value={userData.name} onChange={(e) => handleChange(e)}></Input>
                  <Select label='Select your gender' name='gender' value={userData.gender} onChange={(e) => handleGenderChange(e)}>
                    <Option value='male'>Male</Option>
                    <Option value='female'>Female</Option>
                  </Select>
                  <div className='flex items-center'>
                    <Input
                      type="number"
                      name='height'
                      label='Height'
                      className="rounded-r-none focus:ring-0 focus:ring-offset-0"
                      value={userData.height}
                      onChange={(e) => handleChange(e)}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                    <div className='h-full border rounded-r-md !border-blue-gray-200 border-l-0 px-1 flex items-center bg-blue-gray-50'>cm</div>
                  </div>
                  <div className='flex'>
                    <Input type='number' name='weight' label='Weight' className='rounded-r-none focus:ring-0 focus:ring-offset-0' value={userData.weight} onChange={(e) => handleChange(e)}></Input>
                    <div className='flex items-center px-1 border bg-blue-gray-50 border-blue-gray-200 rounded-r-md'>kg</div>
                  </div>
                  {
                    window.innerWidth > 800 ? <DesktopDatePicker format='DD-MM-YYYY' onChange={(e) => handleDatePickerChange(e)}/> : <MobileDatePicker format='DD-MM-YYYY' label='Birthday' onChange={(e) => handleDatePickerChange(e)}/>
                  }
                  <Button className='bg-accent shadow-brown-100 hover:shadow-brown-200' onClick={() => saveUserData(userData)}>Submit</Button>
                </form>
            </CardBody>
        </Card>
    </div>
  )
}

export default UserDataEntry