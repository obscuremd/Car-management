import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { isMobile, menuItems } from '../Exports/Constatants'
import { Button, Dealers, Menu, Records, Overview, Accountant, Boy } from '../Exports/Exports'
import React from 'react';
import { Xmark } from 'iconoir-react';
import { useApi } from '../Providers/ApiProvider';

const Navigation = () => {

  const [mobileMenu, setMobileMenu] = useState(false)
  const { user, setBranchOptions, branchOptions } = useApi()
  
  const filteredMenuItems = user?.role === "admin" 
  ? menuItems 
  : menuItems.filter(item => item.name !== "Accountant");

  useEffect(()=>{
    if(user?.role !== 'admin' && user?.branch){
      setBranchOptions([user?.branch])
    }
  },[user?.role, user?.branch, setBranchOptions])

      console.log('branch',branchOptions)

  return (
    <Suspense fallback={ 
        <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
          {/* <img src={Logo} alt="" className='md:w-[25%] w-[40%]' /> */}
          loading
        </div> }>
        
        <div className='w-full flex gap-8 relative'>
          <BrowserRouter>
                {!isMobile && <Menu menuItems={filteredMenuItems}/>}
                {isMobile && mobileMenu && 
                  <div className='absolute z-50 w-full h-screen flex flex-col gap-4 py-3 backdrop-blur-xl bg-background-500'>
                    <Button icon_left={<Xmark/>} onclick={()=>setMobileMenu(false)} rounded='full' outline color='primary' size='sm_icon'/>
                    <Menu menuItems={filteredMenuItems} logo={false} />
                  </div>
                  }
                <Content setMobileMenu={setMobileMenu}/>
          </BrowserRouter>
        </div>
    
    </Suspense>
  )
}

interface ContentProps {
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content: React.FC<ContentProps> = ({setMobileMenu}) => {
    const currentPath = useLocation().pathname
    const Path = menuItems.filter(item => item.link === currentPath)

    const { user } = useApi()

    useEffect(() => {
      setMobileMenu(false)
    }, [currentPath, setMobileMenu])

    return (
        <div className='w-full flex flex-col gap-8'>
            <Button onclick={()=>setMobileMenu(true)} color='primary' hover='false' text={Path[0].name} icon_left={Path[0].icon} outline size='lg' rounded='medium' position='start' stretch gap='gap-[32px]' />
            <div className='h-screen overflow-y-scroll'>
              <Routes>
                  <Route path='/' element={<Overview />} />
                  <Route path='/dealers' element={<Dealers />} />
                  <Route path='/records' element={<Records />} />
                  {user?.role === 'admin' && <Route path='/accountant' element={<Accountant />} />}
                  <Route path='/boy' element={<Boy />} />
              </Routes>
            </div>
        </div>
    );
};

export default Navigation