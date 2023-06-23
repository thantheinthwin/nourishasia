import React from 'react'
import { AddRecipePage, CalorieTrackerPage, ProfilePage, RecipePage, SavedRecipesPage } from '../pages'
import { Route, Routes } from 'react-router-dom'

const ContentArea = (props) => {
  const routes = [
    {
      path: '/recipes',
      element: <RecipePage recipes={props.recipes}/>
    },
    {
      path: '/addRecipes',
      element: <AddRecipePage/>
    },
    {
      path: '/calorie_tracker',
      element: <CalorieTrackerPage/>
    },
    {
      path: '/profile',
      element: <ProfilePage/>
    },
    {
      path: '/savedRecipes',
      element: <SavedRecipesPage/>
    }
  ]

  return (
    <div className='w-full h-full bg-secondary'>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element}/>
        ))}
      </Routes>
    </div>
    // <RecipePage/>
  )
}

export default ContentArea