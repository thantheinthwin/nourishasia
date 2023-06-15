import React from 'react'
import {
    Input,
    Button
} from '@material-tailwind/react'

const HomeNavBar = () => {
  return (
    <div className='flex flex-row-reverse w-full px-6 py-4 shadow h-fit'>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color='brown'
            label="Search recipe"
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button size="sm" className="!absolute right-1 top-1 rounded bg-accent shadow-none hover:shadow-brown-100">
            Search
          </Button>
        </div>
    </div>
  )
}

export default HomeNavBar