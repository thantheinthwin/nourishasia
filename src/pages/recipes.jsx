import React, { useEffect } from 'react'

import { RecipeCard } from '../components'
import { useNavigate } from 'react-router-dom'

// This props here is the array of object of recipes fetched with api
const Recipes = (props) => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(window.localStorage.getItem('auth' == 'false')){
      navigate('/', {replace: true})
    }
  },[])

  return (
    <div className='grid w-full max-h-[calc(100%-4rem)] grid-cols-1 gap-8 p-8 mx-auto overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      {/* Using map function to render multiple recipe cards */}
      {props.recipes.map((item, i) => (<RecipeCard item={item} key={i}/>))}
    </div>
  )
}

export default Recipes