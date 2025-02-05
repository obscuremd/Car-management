import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextUi from '../Ui/Text';
import ButtonUI from '../Ui/Button';
import AvatarUi from '../Ui/Avatar';
import { useGen } from '../Providers/GeneralProvider';
import { useClerk } from '@clerk/clerk-react';

interface menuItems {
    icon: React.ReactNode, 
    name: string, 
    link: string
}

interface MenuProps{
    menuItems : Array<menuItems>
    collapsed?: boolean
    mode?: 'vertical' | 'horizontal'
    logo?: boolean
}

const MenuComponent:React.FC<MenuProps> = ({menuItems, collapsed, mode = 'vertical', logo=true}) => {

    const [menu, setMenu] = useState(false)
    const [active, setActive] = useState(0)
    const { user, } = useGen()

    const { signOut } = useClerk()


  return (
        <div className={`${collapsed?'w-fit':'w-[250px]'} flex ${mode==='horizontal' && 'items-center'} ${mode === 'vertical' ? 'flex-col':'gap-2'}`}>
            { logo &&
                <div className='p-5 flex flex-col items-center gap-2'>
                    <button onClick={()=>setMenu(!menu)} className='flex items-center gap-2'>
                        {!collapsed && <TextUi text='Euro 65' fontSize='h5' fontWeight='bold'/>}
                    </button>
                    {menu  && <>
                        <AvatarUi image={user?.profile_picture || ''} size='lg' primary_text={user?.name} secondary_text={user?.email} vertical />
                        <ButtonUI color='danger' size='sm' text='logout' stretch rounded='medium' onclick={()=>signOut()}/>
                    </>
                    }
                </div>}

            <div className={`flex ${mode === 'vertical' && 'flex-col'} gap-2`}>
                {
                    menuItems.map(({icon, link, name}, index)=>(
                        <Link to={link} key={index}>
                            <ButtonUI onclick={()=>setActive(index)} icon_left={icon} color={active === index ?'primary': 'text'} text={collapsed? undefined:name} size='sm' rounded='medium'  stretch position='start'/>
                        </Link>
                    ))
                }
            </div>
        </div>
  )
}

export default MenuComponent