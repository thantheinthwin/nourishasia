import React, { useEffect, useState } from 'react'

import { RecipeCard } from '../components'

const Recipes = (props) => {

  return (
    <div className='grid w-full max-h-[calc(100%-4rem)] grid-cols-1 gap-8 p-8 mx-auto overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      {props.recipes.map((item, i) => (<RecipeCard item={item} key={i}/>))}
    </div>
  )
}

export default Recipes