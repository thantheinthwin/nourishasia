import React, {useState} from 'react'
import {
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Button,
    List,
    ListItem,
    Typography,
} from '@material-tailwind/react'

const RecipeDialog = (props) => {
  

  const {open, handleOpen, recipe} = {...props};

  return (
    <Dialog open={open} handler={handleOpen} className='m'>
        <DialogHeader>{recipe.label}</DialogHeader>
        <DialogBody divider className='grid lg:flex'>
          <div className='flex items-center gap-2 py-2 justify-evenly lg:flex-col bg-blue-gray-50 md:bg-transparent md:justify-start'>
            <img src={recipe.image} alt="meal" className='object-cover w-20 h-20 rounded-md md:w-fit md:h-fit' loading='lazy'/>
            <Typography variant='h5'>{recipe.calories.toFixed(2)} calories</Typography>
          </div>
          <List className='w-full overflow-y-scroll max-h-[calc(60vh-6rem)]'>
            {
              recipe.ingredientLines.map((line, i) => (<ListItem key={i}><span className='mr-2 font-bold'>{i+1}.</span>{line}</ListItem>))
            }  
          </List>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
  )
}

export default RecipeDialog