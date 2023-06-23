import { Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import UploadedRecipeCard from './uploadedRecipeCard'

import { db } from '../config/firebase.config'

import { collection, getDocs, query, where } from 'firebase/firestore'

const UploadedRecipes = () => {
    const [recipes, setRecipes] = useState('');

    const getRecipeData = async () => {
        const q = query(collection(db, 'recipes'), where('source', '==', localStorage.getItem('uid')));

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