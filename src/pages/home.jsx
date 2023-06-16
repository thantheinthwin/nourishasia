import React, { useEffect, useState } from 'react'
import { ContentArea, HomeNavBar, SideBar } from '../components'

const Home = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const handleSideBarOpen = () => setSideBarOpen(!sideBarOpen);

  // useEffect(() => {
  //   setSideBarOpen(window.innerWidth > '800')
  // },[window.innerWidth])

  return (
    <div className='flex w-full h-screen overflow-hidden'>
      <SideBar open={sideBarOpen} setOpen={setSideBarOpen}/>
      <div className='grid w-full'>
        <HomeNavBar handleSideBarOpen={handleSideBarOpen}/>
        <ContentArea/>
      </div>
    </div>
  )
}

export default Home