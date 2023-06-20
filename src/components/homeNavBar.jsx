import React, { useState } from 'react'
import {
    Input,
    Button
} from '@material-tailwind/react'
import {
  Bars3Icon,
} from '@heroicons/react/24/outline'

const HomeNavBar = (props) => {
  const {search, setSearch, showRecipe} = {...props};
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='flex flex-row items-center justify-between w-full px-6 py-4 shadow lg:justify-end h-fit'>
      <i className='w-8 h-8 p-1 rounded-md hover:bg-blue-gray-50 lg:hidden' onClick={props.handleSideBarOpen}><Bars3Icon/></i>
      <div className="relative flex gap-2 w-fit md:w-max">
        <Input
          type="search"
          color='brown'
          label="Search recipe"
          className="pr-24 outline-none focus:ring-0"
          containerProps={{
            className: "min-w-[288px]",
          }}
          value={search}
          onChange={(e) => handleChange(e)}
        />
        <Button size="sm" className="!absolute right-1 top-1 rounded bg-accent shadow-none hover:shadow-brown-100" onClick={() => showRecipe(search)}>
          Search
        </Button>
      </div>
    </div>
  )
}

export default HomeNavBar