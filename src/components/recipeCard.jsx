import React, { useState } from 'react'

import { 
    Typography,
    Button,
    Card,
    CardBody,
    CardFooter,
} from '@material-tailwind/react'
import RecipeDialog from './recipeDialog';

const RecipeCard = (props) => {
  const { item, key } = {...props};

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Card className="grid" key={key}>
      <CardBody className="grid gap-4">
        <img
          src={item.img}
          alt="img"
          className="object-cover rounded-md shadow"
        />
        <Typography variant="h5" color="blue-gray">
          {item.name}
        </Typography>
        <Typography>{item.calorie} calories</Typography>
      </CardBody>
      <CardFooter className="self-end">
        <Button
          className="bg-primary hover:shadow-brown-200"
          onClick={handleOpen}
        >
          Get Recipe
        </Button>
      </CardFooter>
      <RecipeDialog
        open={open}
        handleOpen={handleOpen}
        dish={item.name}
        calorie={item.calorie}
        img={item.img}
      />
    </Card>
  );
}

export default RecipeCard