import React from 'react'
import { AddRecipePage, CalorieTrackerPage, ProfilePage, RecipePage } from '../pages'
import { Route, Routes } from 'react-router-dom'

const ContentArea = () => {
  const routes = [
    {
      path: '/recipes',
      element: <RecipePage/>
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
    }
  ]

  return (
    <div className='w-full h-full'>
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