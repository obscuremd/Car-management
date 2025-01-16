import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Exports/Exports'
import TextUi from '../Ui/Text';
import ButtonUI from '../Ui/Button';

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

    const [active, setActive] = useState(0)

  return (
    <div className={`${collapsed?'w-fit':'w-[250px]'} flex ${mode==='horizontal' && 'items-center'} ${mode === 'vertical' ? 'flex-col':'gap-2'}`}>
        { logo &&
            <div className='p-5 flex items-center gap-2'>
                <img src={Logo} className='w-6'/>
                {!collapsed && <TextUi text='Company' fontSize='h5' fontWeight='bold'/>}
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