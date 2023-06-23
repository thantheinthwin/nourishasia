import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll'
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [openNav, setOpenNav] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    setMobileView(window.innerWidth < 800)
  },[])
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        >
        <Link className="flex items-center transition-all duration-300 ease-in-out cursor-pointer hover:text-brown-500" to={'home'} spy={true} smooth={true} offset={-300} duration={700} onClick={() => {setOpenNav(false)}}>
            About
        </Link>
        </Typography>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        >
        <Link className="flex items-center transition-all duration-300 ease-in-out cursor-pointer hover:text-brown-500" to={'process'} spy={true} smooth={true} offset={mobileView ? -200 : 0} duration={700} onClick={() => {setOpenNav(false)}}>
            Process
        </Link>
        </Typography>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        >
        <Link className="flex items-center transition-all duration-300 ease-in-out cursor-pointer hover:text-brown-500" to={'meals'} spy={true} smooth={true} offset={mobileView ? -300 : -100} duration={700} onClick={() => {setOpenNav(false)}}>
            Meals
        </Link>
        </Typography>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        >
        <Link className="flex items-center transition-all duration-300 ease-in-out cursor-pointer hover:text-brown-500" to={'contact'} spy={true} smooth={true} offset={-100} duration={700} onClick={() => {setOpenNav(false)}}>
            Contact Us
        </Link>
        </Typography>
    </ul>
   );

  return (
    <>
        <Navbar className="sticky inset-0 z-10 max-w-full px-4 py-2 rounded-none h-max lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
            <Typography variant='h3' className='font-logo text-accent'><span className='text-4xl'>N</span>ourishAsia</Typography>
            <div className="flex items-center gap-4">
                <div className="hidden mr-4 lg:block">{navList}</div>
                <NavLink className={"hidden shadow-none lg:inline-block"} to={"/login"}>
                    <Button
                    size="md"
                    className="bg-accent hover:shadow-md hover:shadow-brown-100"
                    >
                        Sign In
                    </Button>
                </NavLink>
                <IconButton
                variant="text"
                className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                >
                {openNav ? (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                ) : (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>
                )}
                </IconButton>
            </div>
            </div>
            <MobileNav open={openNav}>
            {navList}
            <NavLink to={"/login"}>
                <Button size="sm" fullWidth className="mb-2 shadow-none bg-accent hover:shadow-md hover:shadow-brown-300">
                    Sign In
                </Button>
            </NavLink>
            </MobileNav>
        </Navbar>
    </>
  )
}

export default Navigation