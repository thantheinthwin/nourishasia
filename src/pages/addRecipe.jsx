import React, { useState, useEffect } from 'react'

import { Button, Card, CardBody, CardFooter, Input, Typography, Select, Option } from '@material-tailwind/react'
import {
  PlusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { PreviewDialog } from '../components';
import { getNutritionalFacts } from '../api'

const AddRecipe = () => {
  const [ingredientLine, setIngredientLine] = useState([{ingredient: '', quantity: '', unit: 'g'}]);
  const [nutritionFacts, setNutritionFacts] = useState(null);
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [image, setImage] = useState(null);

  const [isMobileView, setMobileView] = useState(false);
  useEffect(() => {
    setMobileView(window.innerWidth < 800)
  }, [isMobileView])
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const cuisine = ['Chinese', 'Japanese', 'Thai', 'Indian', 'Korean', 'Vietnamese', 'Malaysian', 'Indonesian', 'Burmese']
  const units = [
    { value: 'g', label: 'Grams' },
    { value: 'whole', label: 'Whole' },
    { value: 'cup', label: 'Cups' },
    { value: 'tbsp', label: 'Tablespoons' },
    { value: 'tsp', label: 'Teaspoons' },
    { value: 'fl oz', label: 'Fluid ounces' },
    { value: 'pt', label: 'Pints' },
    { value: 'qt', label: 'Quarts' },
    { value: 'ml', label: 'Milliliters' },
    { value: 'lb', label: 'Pounds' },
    { value: 'oz', label: 'Ounces' },
  ];

  const handleAdd = () => {
    setIngredientLine([...ingredientLine, {ingredient: '', quantity: '', unit: 'g'}]);
  }

  const handleDelete = (i) => {
    const deleteVal = [...ingredientLine]
    deleteVal.splice(i, 1)
    setIngredientLine(deleteVal)
  }

  const handleChange = (e, i) => {
    const {name, value} = e.target;
    const onChangeVal = [...ingredientLine];
    onChangeVal[i][name] = value;
    setIngredientLine(onChangeVal);
  }

  const getImage = (e) => {
    const fileItem = e.target.files[0];
    setImage(fileItem);
    // console.log("img:", fileItem);
  }

  const calculateCalorie =  async (data) => {
    getNutritionalFacts(data)
    .then(data => {
      setNutritionFacts({...data});
    })
    .catch(error => {
      console.log(error);
    })
  }

  // console.log(name);
  // console.log(cuisineType)
  // console.log('nutritionFacts', nutritionFacts)
  
  return (
    <div className="w-full max-h-[calc(100%-5rem)] lg:max-h-[calc(100%-1rem)] p-4 overflow-y-scroll">
      <Card className="w-full m-auto mb-20 h-fit lg:w-fit">
        <CardBody className="grid gap-2">
          <Typography variant="h5" className="mb-3">
            Add Recipe
          </Typography>
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="focus:ring-0 focus:ring-offset-0"
          ></Input>

          <Select label="Cuisine" value={cuisineType} onChange={(e) => setCuisineType(e)} >
            {cuisine.map((item, i) => (<Option key={i} value={item}>{item}</Option>))}
          </Select>

          {/* Ingredient Line Input */}
          <div className="grid gap-2 p-2 border rounded-md">
            <div className="flex items-center justify-between">
              <Typography variant='h6'>Ingredient Line</Typography>
              <Button
                variant="outlined"
                size="sm"
                color="blue-gray"
                className="focus:ring-0"
                onClick={handleAdd}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-2">
              {ingredientLine.map((val, i) => (
                <div className="flex gap-1" key={i}>
                  <div className='grid w-full gap-2 lg:flex'>
                    <input className='w-full p-2 transition-all duration-200 ease-in-out border-b outline-none focus:ring-0 focus:ring-offset-0 focus:border-b-black' placeholder='Ingredient' name='ingredient' value={val.ingredient} onChange={(e) => handleChange(e, i)}></input>
                    <div className='flex w-full'>
                      <input className='w-full p-2 transition-all duration-200 ease-in-out border-b outline-none focus:ring-0 focus:ring-offset-0 focus:border-b-black' placeholder='Quantity' name='quantity' value={val.quantity} onChange={(e) => handleChange(e, i)}></input> 
                      <select className='border border-blue-gray-50 focus:bg-brown-50 w-fit focus:ring-0 focus:outline-none focus:border-blue-gray-50 rounded-r-md bg-brown-50' name='unit' value={val.unit} onChange={(e) => handleChange(e, i)}>
                        {
                          units.map((unit, i) => <option key={i}>{!isMobileView ? unit.label : unit.value}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    size="sm"
                    color="red"
                    onClick={() => handleDelete(i)}
                    className="w-fit"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Input */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-fit bg-gray-50 hover:bg-gray-100"
            >
              { image == null 
                ? <div className="flex flex-col items-center justify-center px-4 py-6">
                    <p className="mb-2 text-xl text-gray-500">Thumbnail</p>
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and
                      drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG or JPG (MAX. 800x400px)
                    </p>
                  </div> 
                : <div className='relative flex w-full'>
                    <img src={URL.createObjectURL(image)} className='object-cover mx-auto h-96'/>
                    <div className='absolute flex items-center justify-center w-full h-full hover:bg-opacity-20 hover:bg-white group'><span className='hidden p-2 text-opacity-0 transition-all duration-200 ease-in-out rounded-md group-hover:flex group-hover:bg-blue-gray-50'>Click again to change the photo</span></div>
                  </div>
              }
              <input id="dropzone-file" type="file" className="hidden" accept='image/*' onChange={(e)=>getImage(e)}/>
            </label>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="filled" color="green" onClick={() => {calculateCalorie(ingredientLine).then(handleOpen)}}>
            Preview
          </Button>
          <Button variant="outlined" color="red" onClick={handleOpen}>
            Cancel
          </Button>
        </CardFooter>
        {
          nutritionFacts !== null &&
            <PreviewDialog
              open={open}
              handleOpen={handleOpen}
              recipe={nutritionFacts}
              name={name}
              img={image}
            />
        }
      </Card>
    </div>
  );
}

export default AddRecipe