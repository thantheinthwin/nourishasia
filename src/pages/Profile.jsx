import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

import { app, db } from '../config/firebase.config'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

import moment from 'moment/moment'
import { RecipeCard } from '../components'

const Profile = () => {
  const [userData, setUserData] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [age, setAge] = useState(null);
  const firebaseAuth = getAuth(app);
  const uid = firebaseAuth.currentUser?.uid;
  // console.log(age)
  // console.log('userData : ', userData)
  console.log(recipes)

  const getData = async () => {
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

  const getRecipeData = async () => {
    const q = query(collection(db, 'recipes'), where('source', '==', uid));

    const querySnapShot = await getDocs(q);
    let uploadedRecipes = [];
    querySnapShot.forEach((doc) => {
      uploadedRecipes.push(doc.data());
      // console.log(doc.id, '==', doc.data());
    })
    // console.log(uploadedRecipes)
    setRecipes(uploadedRecipes);
  }

  // retrieving data from firestore
  useEffect(()=>{
    getData();
    getRecipeData();
  },[])

  return (
    <div className='flex flex-col w-full h-full gap-2 p-4 lg:flex-row'>
      <Card className='h-fit w-fit'>
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
      <div className='h-fit w-fit'>
        <div className='grid gap-2'>
          <Typography variant='h5'>Uploaded Recipes</Typography>
          <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3'>
            {recipes !== null && recipes.map((recipe, i) => (<RecipeCard item={recipe} key={i}/>))}
          </div>
        </div>
      </div>
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