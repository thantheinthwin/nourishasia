import React, { useEffect, useState } from 'react'
import { Meal1, Meal2, Meal3, Meal4, Meal5, Meal6, Meal7, Meal8 } from '../assets/img'

import { RecipeCard } from '../components'
import { getRecipe } from '../api'

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(()=>{
    getRecipe('Asian')
    .then(recipeHits => {
      var result = recipeHits.map(i => i['recipe'])
      setRecipes(result);
      // Handle the recipe search results as per your application logic
    })
    .catch(error => {
      console.error(error);
      // Handle errors, such as displaying an error message to the user
    });
  },[])

  return (
    <div className='grid w-full h-[calc(100%-4rem)] grid-cols-1 gap-8 p-8 mx-auto overflow-y-scroll lg:grid-cols-3 xl:grid-cols-5'>
      {recipes.map((item, i) => (<RecipeCard item={item} key={i}/>))}
    </div>
  )
}

export default Recipes