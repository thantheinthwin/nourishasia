import React, { useEffect, useState } from 'react'
import { ContentArea, HomeNavBar, SideBar } from '../components'
import { getRecipe } from '../api';

const Home = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const handleSideBarOpen = () => setSideBarOpen(!sideBarOpen);
  const [filter, setFilter] = useState({foodChoice: '', Cuisine: ''});
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);


  // a function which calls the other function which is used to fetch data from edamam API
  const showRecipe = (query) => {
    getRecipe(query)
    .then(recipeHits => {
      var result = recipeHits.map(i => i['recipe'])
      setRecipes(result);
      // Handle the recipe search results as per your application logic
    })
    .catch(error => {
      console.error(error);
      // Handle errors, such as displaying an error message to the user
    });
  }

  // Once the page is loaded the function below will run once
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
    <div className='flex w-full h-screen overflow-hidden'>
      {/* React states are transferred from parent to child components using props */}
      <SideBar open={sideBarOpen} setOpen={setSideBarOpen} filter={filter} setFilter={setFilter} showRecipe={showRecipe}/>
      <div className='flex flex-col w-full'>
        <HomeNavBar handleSideBarOpen={handleSideBarOpen} search={search} setSearch={setSearch} showRecipe={showRecipe}/>
        <ContentArea recipes={recipes}/>
      </div>
    </div>
  )
}

export default Home