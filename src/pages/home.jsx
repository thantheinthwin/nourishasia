import React, { useEffect, useState } from 'react'
import { ContentArea, HomeNavBar, SideBar } from '../components'

const Home = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const handleSideBarOpen = () => setSideBarOpen(!sideBarOpen);
  const [filter, setFilter] = useState({foodChoice: '', Cuisine: ''});
  const [search, setSearch] = useState('');

  return (
    <div className='flex w-full h-screen overflow-hidden'>
      <SideBar open={sideBarOpen} setOpen={setSideBarOpen} filter={filter} setFilter={setFilter}/>
      <div className='flex flex-col w-full'>
        <HomeNavBar handleSideBarOpen={handleSideBarOpen} search={search} setSearch={setSearch}/>
        <ContentArea/>
      </div>
    </div>
  )
}

export default Home