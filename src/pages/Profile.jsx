import { Card, CardBody, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

import { app, db } from '../config/firebase.config'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import moment from 'moment/moment'

const Profile = () => {
  const [userData, setUserData] = useState('');
  const firebaseAuth = getAuth(app);
  const uid = firebaseAuth.currentUser?.uid;
  console.log(uid)
  // console.log('userData : ', userData)

  const getData = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // retrieving data from firestore
  useEffect(()=>getData,[])
  const age = calculateAge(userData.birthday.toDate().toISOString());
  console.log(age);
  // console.log(userData.birthday.toDate().toISOString());

  return (
    <div className='flex w-full h-full p-4'>
    <Card className='h-fit w-fit'>
      <CardBody className='grid gap-2'>
        <Typography variant='h5'>Profile</Typography>
        <Typography>Name: {userData.name}</Typography>
        <Typography>Gender: {userData.gender}</Typography>
        <Typography>Age: {age} years</Typography>
        <Typography>Height: {userData.height} cm</Typography>
        <Typography>Weight: {userData.weight} kg</Typography>
      </CardBody>
    </Card>
    </div>
  )
}

export function calculateAge(birthdateISOString) {
  const birthdate = moment(birthdateISOString);
  const currentDatetime = moment();
  const ageDuration = moment.duration(currentDatetime.diff(birthdate));

  const ageYears = ageDuration.years();
  
  return ageYears;
}

export default Profile