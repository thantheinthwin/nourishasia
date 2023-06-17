import React from 'react'
import { Meal1, Meal2, Meal3, Meal4, Meal5, Meal6, Meal7, Meal8 } from '../assets/img'

import { RecipeCard } from '../components'

const Recipes = () => {
    const meals = [
        {
          name: 'Tuna Spaghetti',
          img: Meal1,
          calorie: '330-440'
        },
        {
          name: 'Persley Eggs',
          img: Meal2,
          calorie: '140-150'
        },
        {
          name: 'Avocado Toast',
          img: Meal3,
          calorie: '190-280'
        },
        {
          name: 'Vegan Rice Dish',
          img: Meal4,
          calorie: '270-450'
        },
        {
          name: 'Roasted Asparagus',
          img: Meal5,
          calorie: '233.5'
        },
        {
          name: 'Beef Steak',
          img: Meal6,
          calorie: '200-350'
        },
        {
          name: 'Spring Salad',
          img: Meal7,
          calorie: '120-160'
        },
        {
          name: 'Chicken Breast',
          img: Meal8,
          calorie: '~330'
        },
      ]
  
    return (
      <div className='grid w-full h-full grid-cols-1 gap-8 p-8 mx-auto overflow-y-scroll lg:grid-cols-3 xl:grid-cols-5'>
          {meals.map((item, i) => (<RecipeCard item={item} key={i}/>))}
          {/* <RecipeDialog dish={meals[0].name} calorie={meals[0].calorie} img={meals[0].img}/> */}
      </div>
    )
}

export default Recipes