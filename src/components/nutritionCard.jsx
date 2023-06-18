import React from 'react'
import { 
    Card, 
    CardBody,
    Typography,
  } from '@material-tailwind/react'

const NutritionCard = ({nutritionFacts}) => {
  return (
    <Card className="grid w-11/12 p-4 m-auto md:w-2/3 xl:w-1/3 h-fit">
        <CardBody className='grid gap-4'>
          <div className='grid gap-1'>
            <Typography className='text-xl font-bold md:text-3xl'>Nutrition Facts</Typography>
            <hr className="h-2 rounded bg-blue-gray-50 border-blue-gray-50" />
          </div>
          <div className='grid gap-1'>
            <Typography className='text-base font-bold md:text-xl'>Amount Per Serving</Typography>
            <div className='flex items-center justify-between'>
              <Typography className='text-4xl font-bold'>Calories</Typography>
              <Typography className='text-4xl font-bold'>{nutritionFacts.calories}</Typography>
            </div>
            <hr className="h-1 rounded bg-blue-gray-50 border-blue-gray-50" />
          </div>
          <div className='flex flex-col'>
              <Typography className='pb-2 text-xs font-bold text-right border-b'>% Daily Value *</Typography>
              {/* Fat */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm font-bold md:text-base'>Total Fat <span className='font-normal'>{nutritionFacts.totalNutrients.FAT.quantity.toFixed(1)} {nutritionFacts.totalNutrients.FAT.unit}</span></Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.FAT.quantity)} {nutritionFacts.totalDaily.FAT.unit}</Typography>
              </div>
              <div className='flex justify-between ml-6 border-b'>
                <Typography className='py-1 text-sm md:text-base'>Trans Fat {nutritionFacts.totalNutrients.FASAT.quantity.toFixed(1)} {nutritionFacts.totalNutrients.FASAT.unit}</Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.FASAT.quantity)} {nutritionFacts.totalDaily.FASAT.unit}</Typography>
              </div>
              <div className='flex justify-between ml-6 border-b'>
                <Typography className='py-1 text-sm md:text-base'>Saturated Fat {nutritionFacts.totalNutrients.FATRN.quantity.toFixed(1)} {nutritionFacts.totalNutrients.FATRN.unit}</Typography>
              </div>
              {/* Cholesterol */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm font-bold md:text-base'>Cholesterol <span className='font-normal'>{nutritionFacts.totalNutrients.CHOLE.quantity.toFixed(1)} {nutritionFacts.totalNutrients.CHOLE.unit}</span></Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.CHOLE.quantity)} {nutritionFacts.totalDaily.CHOLE.unit}</Typography>
              </div>
              {/* Sodium */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm font-bold md:text-base'>Sodium <span className='font-normal'>{nutritionFacts.totalNutrients.NA.quantity.toFixed(1)} {nutritionFacts.totalNutrients.NA.unit}</span></Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.NA.quantity)} {nutritionFacts.totalDaily.NA.unit}</Typography>
              </div>
              {/* Total Carbohydrate */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm font-bold md:text-base'>Total Carbohydrate <span className='font-normal'>{nutritionFacts.totalNutrients.CHOCDF.quantity.toFixed(1)} {nutritionFacts.totalNutrients.CHOCDF.unit}</span></Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.CHOCDF.quantity)} {nutritionFacts.totalDaily.CHOCDF.unit}</Typography>
              </div>
              <div className='flex justify-between ml-6 border-b'>
                <Typography className='py-1 text-sm md:text-base'>Dietary Fiber {nutritionFacts.totalNutrients.FIBTG.quantity.toFixed(1)} {nutritionFacts.totalNutrients.FIBTG.unit}</Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.FIBTG.quantity)} {nutritionFacts.totalDaily.FIBTG.unit}</Typography>
              </div>
              <div className='flex justify-between ml-6 border-b'>
                <Typography className='py-1 text-sm md:text-base'>Total Sugars {nutritionFacts.totalNutrients.SUGAR.quantity.toFixed(1)} {nutritionFacts.totalNutrients.SUGAR.unit}</Typography>
              </div>
              { nutritionFacts.totalNutrients.SUGAR.quantity !== 0 &&
                <div className='flex justify-between ml-6 border-b'>
                  <Typography className='py-1 text-sm md:text-base'>Includes - Added Sugars</Typography>
                </div>
              }
              {/* Protein */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm font-bold md:text-base'>Protein <span className='font-normal'>{nutritionFacts.totalNutrients.PROCNT.quantity.toFixed(1)} {nutritionFacts.totalNutrients.PROCNT.unit}</span></Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.PROCNT.quantity)} {nutritionFacts.totalDaily.PROCNT.unit}</Typography>
              </div>
              {/* Vitamin D */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm md:text-base'>Vitamin D {nutritionFacts.totalNutrients.VITD.quantity.toFixed(1)} {nutritionFacts.totalNutrients.VITD.unit}</Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.VITD.quantity)} {nutritionFacts.totalDaily.VITD.unit}</Typography>
              </div>
              {/* Calcium */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm md:text-base'>Calcium {nutritionFacts.totalNutrients.CA.quantity.toFixed(1)} {nutritionFacts.totalNutrients.CA.unit}</Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.CA.quantity)} {nutritionFacts.totalDaily.CA.unit}</Typography>
              </div>
              {/* Iron */}
              <div className='flex justify-between border-b'>
                <Typography className='py-1 text-sm md:text-base'>Iron {nutritionFacts.totalNutrients.FE.quantity.toFixed(1)} {nutritionFacts.totalNutrients.FE.unit}</Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.FE.quantity)} {nutritionFacts.totalDaily.FE.unit}</Typography>
              </div>
              {/* Potassium */}
              <div className='flex justify-between'>
                <Typography className='py-1 text-sm md:text-base'>Potassium {nutritionFacts.totalNutrients.K.quantity.toFixed(1)} {nutritionFacts.totalNutrients.K.unit}</Typography>
                <Typography className='py-1 text-sm font-bold md:text-base'>{Math.round(nutritionFacts.totalDaily.K.quantity)} {nutritionFacts.totalDaily.K.unit}</Typography>
              </div>
              <div className='flex justify-between mt-4 border-b'>
                <Typography className='text-xs'>*Percent Daily Values are based on a 2000 calorie diet</Typography>
              </div>
          </div>
        </CardBody>
      </Card>
  )
}

export default NutritionCard