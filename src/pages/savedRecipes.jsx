import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase.config';
import { RecipeCard } from '../components';

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState('');

    const getSavedRecipes = async () => {
        const docRef = doc(db, 'users', localStorage.getItem('uid'));
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const savedRecipes = docSnap.data().savedRecipes;
            setSavedRecipes(savedRecipes);
            // setSavedRecipes(docSnap.data().savedRecipes)
        } else {
            console.log('No such document!')
        }
    }

    useEffect(()=>{
        getSavedRecipes()
    },[])

    return (
        <div className='grid w-full max-h-[calc(100%-4rem)] grid-cols-1 gap-8 p-8 mx-auto overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
            {(savedRecipes) && savedRecipes.map((item, i) => (<RecipeCard item={item} key={i}/>))}
        </div>
    )
}

export default SavedRecipes