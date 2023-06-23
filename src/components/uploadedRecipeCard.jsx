import { Button, Typography } from '@material-tailwind/react';
import React, {useState} from 'react'

import {
    MagnifyingGlassIcon
  } from "@heroicons/react/24/outline";
import RecipeDialog from './recipeDialog';

const UploadedRecipeCard = (props) => {
  const { item } = {...props};

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className='flex items-center justify-between gap-4 px-4 py-2 border rounded-md h-fit'>
        <div className='flex items-center justify-start gap-4'>
            <img src={item.image} alt={item.label} className='w-20'/>
            <Typography variant='h6'>{item.label}</Typography>
        </div>
        <Button variant='outlined' color='green'><MagnifyingGlassIcon className='w-5 h-5' onClick={handleOpen}/></Button>
        <RecipeDialog
            open={open}
            handleOpen={handleOpen}
            recipe={item}
        />
    </div>
  )
}

export default UploadedRecipeCard