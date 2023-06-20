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
    <Card className="grid max-h-[34rem] justify-center" key={key}>
      <CardBody className="grid gap-4">
        <img
          src={item.image}
          alt="img"
          className="object-cover rounded-md shadow"
        />
        <Typography variant="h5" color="blue-gray">
          {item.label}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-end self-end justify-between">
        <Typography>{item.calories.toFixed(2)} <br/>calories</Typography>
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
        recipe={item}
      />
    </Card>
  );
}

export default RecipeCard