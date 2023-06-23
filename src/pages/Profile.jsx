import { Card, CardBody, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

import { db } from '../config/firebase.config'
import { doc, getDoc } from 'firebase/firestore'

import moment from 'moment/moment'
import { UploadedRecipes } from '../components'

const Profile = () => {
  return (
    <div className='flex flex-col w-full h-[calc(100%-1rem)] gap-3 p-4 lg:flex-row overflow-y-scroll pb-20'>
      <ProfileCard />
      <UploadedRecipes />
    </div>
  )
}

export const ProfileCard = () => {
  const [userData, setUserData] = useState('');
  const [age, setAge] = useState(null);

  const getData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
      setAge(calculateAge(docSnap.data()?.birthday.toDate().toISOString()));
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // retrieving data from firestore
  useEffect(()=>{
    getData(localStorage.getItem('uid'))
  },[])
  
  return(
    <Card className='w-full md:w-96 h-fit'>
          <CardBody className='grid gap-2'>
            <Typography variant='h5'>Profile</Typography>
            <table className='table-auto'>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td className='px-2'>:</td>
                  <td className='font-thin'>{userData.name}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td className='px-2'>:</td>
                  <td className='font-thin capitalize'>{userData.gender}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td className='px-2'>:</td>
                  <td className='font-thin'>{age} years</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td className='px-2'>:</td>
                  <td className='font-thin'>{userData.height} cm</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td className='px-2'>:</td>
                  <td className='font-thin'>{userData.weight} kg</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
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