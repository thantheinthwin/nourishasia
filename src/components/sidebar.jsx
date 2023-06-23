import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Option,
  Select,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  ListItemSuffix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  FolderIcon,
  PowerIcon,
  ArrowDownTrayIcon,
  BeakerIcon,
  BookmarkIcon
} from "@heroicons/react/24/solid";

import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "../assets/img";

import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
 
const SideBar = (props) => {
  const {open, setOpen, filter, setFilter, showRecipe} = {...props}
  const [isRecipePage, setRecipePage] = useState(false);
  const [formattedQuery, setFormattedQuery] = useState('');

  const closeDrawer = () => setOpen(false);

  const navigate = useNavigate();

  const cuisine = ['All', 'Chinese', 'Japanese', 'Thai', 'Indian', 'Korean', 'Vietnamese', 'Malaysian', 'Indonesian', 'Burmese']

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut()
    .then(() => {
      window.localStorage.setItem("auth", "false");
      window.localStorage.removeItem('firstTime');
      navigate('/', {replace: true});
    }).catch((e) => console.log(e));
  }

  useEffect(() => {
    if(window.location.href.split('/')[4] == 'recipes'){
      setRecipePage(true);
    }
    else{
      setRecipePage(false);
    }
  },[window.location.href])

  const handleChange = (e, name) => {
    const newFilter = {...filter};
    newFilter[name] = e;
    setFilter(newFilter);
  }

  useEffect(()=>{
    var foodChoice = '';
    if(filter.foodChoice !== 'Non-vegan'){
      foodChoice = filter.foodChoice;
    }
    setFormattedQuery(foodChoice + ' ' + filter.Cuisine)
  },[filter])
 
  return (
    <React.Fragment>
      {/* Mobile View Sidebar */}
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="max-w-[17rem] flex flex-col p-2 pb-6 shadow-xl shadow-blue-gray-900/5 h-screen lg:hidden justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 p-4 mb-2">
              <img src={Logo} alt="brand" />
            </div>
            <List className="grid">
              {isRecipePage && (
                <AnimatePresence>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.25}}>
                  <div className="grid gap-4">
                      <Select label="Food Choice" value={filter.foodChoice} onChange={(e) => handleChange(e, 'foodChoice')}>
                        <Option value="Vegan">Vegan</Option>
                        <Option value="Non-vegan">Non-vegan</Option>
                      </Select>
                      <Select label="Cuisine" value={filter.Cuisine} onChange={(e) => handleChange(e, 'Cuisine')} >
                        {cuisine.map((item, i) => (<Option key={i} value={item}>{item}</Option>))}
                      </Select>
                      <div className="p-2 text-center transition-all duration-100 ease-in-out border rounded-md cursor-pointer hover:bg-blue-gray-50 border-blue-gray-50" onClick={()=>{showRecipe(formattedQuery); closeDrawer()}}>Filter</div>
                  </div>
                  <hr className="my-2 border-blue-gray-50" />
                </motion.div>
                </AnimatePresence>
              )}
              <ListItem onClick={closeDrawer}>
                <NavLink to={'/home/recipes'} className='flex w-full'>
                  <ListItemPrefix>
                    <FolderIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Recipes
                </NavLink>
              </ListItem>
              <ListItem onClick={closeDrawer}>
                <NavLink to={'/home/addRecipes'} className='flex w-full'>
                  <ListItemPrefix>
                    <ArrowDownTrayIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Add recipe
                </NavLink>
              </ListItem>
              <ListItem onClick={closeDrawer}>
                <NavLink to={'/home/calorie_tracker'} className='flex w-full'>
                  <ListItemPrefix>
                    <BeakerIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Calorie Tracker
                </NavLink>
              </ListItem>
              <hr className="my-2 border-blue-gray-50" />
              <ListItem onClick={closeDrawer}>
                <NavLink to={'/home/profile'}  className='flex w-full'>
                  <ListItemPrefix>
                    <UserCircleIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Profile
                </NavLink>
              </ListItem>
              <ListItem onClick={closeDrawer}>
                <NavLink to={'/home/savedRecipes'}  className='flex w-full'>
                  <ListItemPrefix>
                    <BookmarkIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Saved Recipes
                </NavLink>
              </ListItem>
            </List>
          </div>
          <List>
            <ListItem onClick={logOut}>
              <ListItemPrefix>
                <PowerIcon className="w-5 h-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Desktop View Sidebar */}
      <div className="max-w-[17rem] lg:flex flex-col p-2 shadow-xl shadow-blue-gray-900/5 h-screen hidden justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 p-4 mb-2">
            <img src={Logo} alt="brand" className="" />
          </div>
          <List className="grid">
            {isRecipePage && (
              <AnimatePresence>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.25}}>
                <div className="grid gap-4">
                    <Select label="Food Choice" value={filter.foodChoice} onChange={(e) => handleChange(e, 'foodChoice')}>
                      <Option value="Vegan">Vegan</Option>
                      <Option value="Non-vegan">Non-vegan</Option>
                    </Select>
                    <Select label="Cuisine" value={filter.Cuisine} onChange={(e) => handleChange(e, 'Cuisine')} >
                      {cuisine.map((item, i) => (<Option key={i} value={item}>{item}</Option>))}
                    </Select>
                    <div className="p-2 text-center transition-all duration-100 ease-in-out border rounded-md cursor-pointer hover:bg-blue-gray-50 border-blue-gray-50" onClick={() => showRecipe(formattedQuery)}>Filter</div>
                </div>
                <hr className="my-2 border-blue-gray-50" />
              </motion.div>
              </AnimatePresence>
            )}
            <ListItem>
                <NavLink to={'/home/recipes'} className='flex w-full'>
                  <ListItemPrefix>
                    <FolderIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Recipes
                </NavLink>
              </ListItem>
            <ListItem>
              <NavLink to={'/home/addRecipes'} className='flex w-full'>
                <ListItemPrefix>
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </ListItemPrefix>
                Add recipe
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={'/home/calorie_tracker'} className='flex w-full'>
                <ListItemPrefix>
                  <BeakerIcon className="w-5 h-5" />
                </ListItemPrefix>
                Calorie Tracker
              </NavLink>
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <NavLink to={'/home/profile'}  className='flex w-full'>
                <ListItemPrefix>
                  <UserCircleIcon className="w-5 h-5" />
                </ListItemPrefix>
                Profile
              </NavLink>
            </ListItem>
            <ListItem onClick={closeDrawer}>
                <NavLink to={'/home/savedRecipes'}  className='flex w-full'>
                  <ListItemPrefix>
                    <BookmarkIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Saved Recipes
                </NavLink>
              </ListItem>
          </List>
        </div>
        <List>
          <ListItem onClick={logOut}>
            <ListItemPrefix>
              <PowerIcon className="w-5 h-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
    </React.Fragment>
  );
}

export default SideBar;