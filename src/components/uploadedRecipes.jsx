import { Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import UploadedRecipeCard from './uploadedRecipeCard'

import { app, db } from '../config/firebase.config'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useStateValue } from '../context/StateProvider'

const UploadedRecipes = (props) => {
    const {uid} = {...props};
    const [recipes, setRecipes] = useState('');

    const getRecipeData = async () => {
        const q = query(collection(db, 'recipes'), where('source', '==', uid));

        const querySnapShot = await getDocs(q);
        let uploadedRecipes = [];
        querySnapShot.forEach((doc) => {
            uploadedRecipes.push(Object.assign(doc.data(), {id: doc.id}));
            // console.log(doc.id, '==', doc.data());
        })
        // console.log(uploadedRecipes)
        setRecipes(uploadedRecipes);
        }

    useEffect(()=>{
        getRecipeData()
    },[])

    return (
        <div className='flex flex-col w-full gap-2 p-2 bg-white rounded-md shadow h-fit'>
            <Typography variant='h5'>Uploaded Recipes</Typography>
            <div className='flex flex-col w-full gap-2 pb-3 h-fit'>
                {recipes !== '' && recipes.map((recipe, i) => (<UploadedRecipeCard item={recipe} key={i}/>))}
            </div>
        </div>
    )
}

export default UploadedRecipes