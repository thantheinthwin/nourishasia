import { Card, Typography } from '@material-tailwind/react'
import React from 'react'

const Profile = () => {
  return (
    <div className='flex w-full h-full p-4'>
    <Card className='grid p-4 h-fit w-fit'>
      <Typography variant='h5'>Profile</Typography>
    </Card>
    </div>
  )
}

export default Profile