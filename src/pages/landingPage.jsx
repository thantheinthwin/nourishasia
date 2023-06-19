import React, { useEffect } from 'react'
import { Footer, Navigation } from '../components'

import { Bg1, Hero, Meal1, Meal2, Meal3, Meal4, Meal5, Meal6, Meal7, Meal8 } from '../assets/img'

import { 
  Typography,
  Button,
  Card,
  CardBody,
  CardFooter } from '@material-tailwind/react'

import { NavLink, useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();

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

  // Routing the user back to home screen if the user has already logged in
  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true"){
        navigate("/home/recipes", {replace: true})
    }
  }, [])

  return (
    <div className='grid gap-16'>
      <Navigation/>
      <div className='grid w-full xl:w-3/4 xl:mx-auto'>
        <section className='grid grid-cols-1 p-2 lg:grid-cols-4' id='home'>
          <div className='flex flex-col justify-center order-last col-span-3 gap-2 px-4 py-4 lg:py-40 lg:gap-6 lg:pr-20 lg:order-first'>
            <Typography variant='h3' className='text-2xl text-right lg:text-left text-accent'>Let's Create Your Healthy Meal</Typography>
            <Typography variant='paragraph' className='text-xl text-justify lg:text-3xl decotext text-primary'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Join our community of food enthusiasts and embark on a flavourful journey that nourishes both body and soul. Start cooking and living a healthier Asian-inspired life with NourushAsia today.</Typography>
            <NavLink className={"w-fit place-self-end lg:place-self-start"} to={"/login"}>
                <Button
                size="md"
                className="px-10 rounded-md bg-accent hover:shadow-md hover:shadow-brown-100"
                >
                    Sign In
                </Button>
            </NavLink>
          </div>
          <img src={Hero} alt='Hero' className='object-cover col-span-1 rounded-md lg:h-full'/>
          {/* <div className='grid col-span-1'>
            
          </div> */}
        </section>
        <section className='grid p-3' id='process'>
          <figure className="relative w-full h-full">
            <img
              className="w-full h-[100vh] lg:h-[calc(100vh-2rem)] rounded-xl object-cover object-bottom"
              src={Bg1}
              alt="Bg1"
            />
            <figcaption className="absolute flex justify-between w-[calc(100%-2rem)] lg:w-fit px-6 py-4 border border-white shadow-lg bottom-8 left-2/4 -translate-x-2/4 rounded-xl bg-white/75 shadow-black/5 saturate-200 backdrop-blur-sm">
              <div className='grid gap-2'>
                <Typography variant='h4' className='text-lg text-center lg:text-xl'>Unlock the Secrets of Healthy Eating</Typography>
                <Typography variant='paragraph' className='text-xs text-center lg:text-sm xl:text-base'>Explore our extensive collection of articles, recipes, and tips that delve into the world of nutrition. From understanding macronutrients to decoding food labels, we have you covered every step of the way. Our team of experienced nutritionists is constantly curating the latest research and trends, ensuring that you stay ahead of the game.</Typography>
              </div>
            </figcaption>
          </figure>
        </section>
        <section className='grid gap-2' id='meals'>
          <Typography variant='h3' className='text-lg text-center lg:text-xl'>Healthy Meals</Typography>
          <Typography variant='paragraph' className='w-4/5 mx-auto text-xs text-center lg:w-2/5 lg:text-sm xl:text-base'>
            Remember, the power to transform your life through nutrition lies within your reach. Let us be your trusted partner on this exciting adventure.
          </Typography>
          <div className='grid w-4/5 grid-cols-1 gap-4 mx-auto lg:grid-cols-4'>
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
                  <Button className='bg-primary hover:shadow-brown-200' onClick={() => {window.localStorage.getItem('auth' ? navigate('/login', {replace: true}) : navigate('/home', {replace: true}))}}>Get Recipe</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  )
}

export default LandingPage