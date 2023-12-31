import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Card, 
  CardBody, 
  CardFooter, 
  Typography, 
  Button,
} from '@material-tailwind/react'
import {
  TrashIcon
} from '@heroicons/react/24/outline'
import { getNutritionalFacts } from '../api'
import { NutritionCard } from '../components'

const CalorieTracker = () => {
  const [data, setData] = useState([{ingredient: '', quantity: '', unit: 'g'}])
  const [isMobileView, setMobileView] = useState(false);

  const [nutritionFacts, setNutritionFacts] = useState(null);

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
    setData([...data, {ingredient: '', quantity: '', unit: 'g'}]);
  }

  const handleChange = (e, i) => {
    // console.log(e);
    const {name, value} = e.target;
    const onChangeVal = [...data];
    onChangeVal[i][name] = value;
    setData(onChangeVal);
  }

  const handleDelete = (i) => {
    const deleteVal = [...data]
    deleteVal.splice(i,1)
    setData(deleteVal)
  }

  // getting nutritional facts with api
  const calculateCalorie =  async (data) => {
    getNutritionalFacts(data)
    .then(data => {
      // Assigning the object fetched from api to react state
      setNutritionFacts({...data});
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    setMobileView(window.innerWidth < 800)
  }, [isMobileView])

  // console.log(nutritionFacts);

  return (
    <div className="flex flex-col w-full gap-3 pt-4 pb-14 h-[calc(100%-2rem)] overflow-y-scroll xl:flex-row">
      <Card className="grid w-11/12 px-4 m-auto lg:w-5/6 xl:w-3/5 h-fit">
        <CardBody className='grid gap-4'>
          <div className='flex items-center justify-between'>
            <Typography variant='h5'>Calorie Tracker</Typography>
            <Button variant='outlined' size='sm' color='blue-gray' className='focus:ring-0' onClick={handleAdd}>Add</Button>
          </div>
          <form className='grid gap-2 p-3 -mx-4 border rounded-md'>
            <Typography variant='small' color='brown' className='ml-2'>Enter an ingredient list for what you are cooking ...</Typography>
              <AnimatePresence>
              {
                data.map((val, i) => (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5, ease: 'easeInOut'}} className='flex items-center gap-4' key={i}>
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
                    <Button variant='text' size='sm' color='red' onClick={() => handleDelete(i)} className='w-1/6 h-full'><TrashIcon className='w-5 h-5 mx-auto'/></Button>
                  </motion.div>
                ))
              }
              </AnimatePresence>
          </form>
        </CardBody>
        <CardFooter>
          <Button
            className="-mt-6 bg-primary hover:shadow-brown-200"
            onClick={() => calculateCalorie(data)}
          >
            Calculate the calories
          </Button>
        </CardFooter>
        {/* <Table headers={table.headers} contents={table.contents}/> */}
      </Card>
      { nutritionFacts && <NutritionCard nutritionFacts={nutritionFacts}/>
      }
    </div>
  );
}

// export const Table = (props) => {
//   const {headers, contents} = {...props};

//   return (
//     <table className='table-auto'>
//       <thead>
//         <tr>
//           {headers.map(header => <td>{header}</td>)}
//         </tr>
//       </thead>
//       <tbody>
//         {
//           contents.map(content => {
//             <tr>
//               <td>{content}</td>
//             </tr>
//           })
//         }
//       </tbody>
//     </table>
//   )
// }

export default CalorieTracker