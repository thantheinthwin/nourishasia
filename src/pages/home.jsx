import React from 'react'
import { ContentArea, HomeNavBar, SideBar } from '../components'

const home = () => {
  return (
    <div className='flex w-full h-screen'>
      <SideBar/>
      <div className='grid w-full'>
        <HomeNavBar/>
        <ContentArea/>
      </div>
    </div>
  )
}

export default home