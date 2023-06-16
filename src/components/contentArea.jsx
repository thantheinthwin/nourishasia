import React, { useState } from 'react'
import { Meal1, Meal2, Meal3, Meal4, Meal5, Meal6, Meal7, Meal8 } from '../assets/img'

import { 
    Typography,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    List,
    ListItem,
} from '@material-tailwind/react'

const ContentArea = () => {
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

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

  return (
    <div className='grid w-full h-full grid-cols-1 gap-8 p-8 mx-auto overflow-y-scroll lg:grid-cols-4'>
        {meals.map((item, i) => (
            <Card className="grid" key={i}>
              <CardBody className='grid gap-4'>
                <img src={item.img} alt="img" className='object-cover rounded-md shadow'/>
                <Typography variant="h5" color="blue-gray">
                  {item.name}
                </Typography>
                <Typography>
                  {item.calorie} calories
                </Typography>
              </CardBody>
              <CardFooter className='self-end'>
                <Button className='bg-primary hover:shadow-brown-200' onClick={handleOpen}>Get Recipe</Button>
              </CardFooter>
            </Card>
          ))}
        <RecipeCard open={open} handleOpen={handleOpen} dish={meals[0].name} calorie={meals[0].calorie} img={meals[0].img}/>
        {/* {meals.map((item, i) => (<RecipeCard open={open} handleOpen={handleOpen} dish={item.name} calorie={item.calorie} img={item.img}/>))}  */}
    </div>
  )
}

export const RecipeCard = (props) => {
    const {open, handleOpen, dish, calorie, img} = {...props};

    return(
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

export default ContentArea