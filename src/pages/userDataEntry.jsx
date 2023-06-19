import React from 'react'
import { Card, CardBody, Input, Select, Option, Typography, Button } from '@material-tailwind/react'
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers'

const UserDataEntry = () => {
  return (
    <div className='flex w-full h-screen bg-secondary'>
        <Card className='grid w-11/12 gap-2 m-auto lg:max-w-md h-fit'>
            <CardBody className='grid gap-2'>
                <Typography variant='h5'>Welcome to <span className='text-2xl font-bold font-logo text-accent'><span className='text-3xl'>N</span>ourishAsia</span> !</Typography>
                <Typography variant='small' className='text-blue-gray-500'>To offer personalized nutritional advice, we kindly request some information. Please answer the following questions:</Typography>
                <form className='grid gap-3 my-2'>
                  <Select label='Select your gender'>
                    <Option>Male</Option>
                    <Option>Female</Option>
                  </Select>
                  <div className='flex items-center'>
                    <Input
                      type="number"
                      placeholder="Height"
                      className="rounded-r-none !border-t-blue-gray-200 outline-none focus:ring-0 focus:ring-offset-0 focus:!border-t-blue-500"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                    <div className='h-full border !border-y-blue-gray-200 px-1 flex items-center bg-blue-gray-50'>Feet</div>
                    <Input
                      type="number"
                      placeholder="Height"
                      className="rounded-none !border-t-blue-gray-200 outline-none focus:ring-0 focus:ring-offset-0 focus:!border-t-blue-500"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                    <div className='h-full border rounded-r-md !border-blue-gray-200 border-l-0 px-1 flex items-center bg-blue-gray-50'>Inches</div>
                  </div>
                  <div className='flex'>
                    <Input type='number' label='Weight' className='rounded-r-none focus:ring-0 focus:ring-offset-0'></Input>
                    <div className='flex items-center px-1 border bg-blue-gray-50 border-blue-gray-200 rounded-r-md'>kg</div>
                  </div>
                  {
                    window.innerWidth > 800 ? <DesktopDatePicker format='DD-MM-YYYY'/> : <MobileDatePicker format='DD-MM-YYYY' label='Birthday'/>
                  }
                  <Button className='bg-accent shadow-brown-100 hover:shadow-brown-200'>Submit</Button>
                </form>
            </CardBody>
        </Card>
    </div>
  )
}

export default UserDataEntry