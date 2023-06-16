import React, {useState} from 'react'
import {
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Button,
    List,
    ListItem,
} from '@material-tailwind/react'

const RecipeDialog = (props) => {
  

  const {open, handleOpen, dish, calorie, img} = {...props};

  return (
    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{dish}</DialogHeader>
        <DialogBody divider className='flex'>
          <img src={img} alt="meal" className='rounded-md h-96'/>
          <List className='w-full'>
            <ListItem>
                Calories : {calorie} calories
            </ListItem>
            <ListItem>
                Protein : Around 20-25 grams
            </ListItem>
            <ListItem>
                Carbohydrates: Approximately 40-50 grams
            </ListItem>
            <ListItem>
                Fat: Approximately 10-15 grams
            </ListItem>
            <ListItem>
                Fiber: Around 5-8 grams
            </ListItem>
            <ListItem>
                Sodium: Approximately 500-800 grams
            </ListItem>
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