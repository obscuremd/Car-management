import { Button, Card, Input, Text } from '../Exports/Exports'
import { cardData } from '../Exports/Constatants'
import { NavArrowDown, NavArrowRight, NavArrowUp } from 'iconoir-react'
import { List } from '../Components/List'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useApi } from '../Providers/ApiProvider'

export default function DealersScreen(){

 const[state,setState] = useState('Cars')
 const[open,setOpen] = useState(false)

 const[dealer, setDealer] =useState<User[]>([])
 const[loading, setLoading] = useState(false)

 const {getDealer} = useApi()

 useEffect(()=>{
  getDealer({setDealer, setLoading})
 },[])

  return (
   <div className='flex flex-col gap-8 w-full'>
        
        

        <div className='flex flex-col gap-1'>
          <Text text='Select Park' fontSize='caption'/>
          <Button rounded='full' color='primary' size='xs' text='Hero Park' icon_right={<NavArrowDown/>}/>
        </div>
        
        <div className='w-full flex gap-4 overflow-x-scroll py-1 px-1'>
          {
            loading
            ?'Loading . . . '
            :
            (dealer.map((item)=>(
              <Card 
                outline='primary' 
                avatar 
                avatar_image={item.profile_picture} 
                avatar_primary_text={item.name} 
                avatar_secondary_text={item.email}
                
                />
            )))
          }
        </div>

        <Card 
              outline='primary'
              image='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' 
              avatar 
              avatar_image={'https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D'} 
              avatar_primary_text={'Bai Hamar'} 
              avatar_secondary_text={'Bai.hamar@gmail.com'}
              primary_text='Warri City Stadium'
              secondary_text='(+234) 090-xxx-xxxx'
              button
              button_text='24 Total Boys'
              />
        
        <div className='flex flex-col gap-4'>
          <div className='relative'>
            <Button color='primary' hover='false' onclick={()=>setOpen(!open)} text={state} icon_right={open?<NavArrowDown/>:<NavArrowUp/>} size='lg' rounded='medium' position='center' stretch  />
            {open &&
              <AnimatePresence>
                <motion.div initial={{opacity:0, y:-100}}  animate={{opacity:1, y:0}}  className='absolute w-full z-50 backdrop-blur-lg pt-2 flex flex-col gap-2'>
                  <Button color='primary' outline hover='false' text='Cars' onclick={()=>[setState('Cars'),setOpen(false)]} size='lg' rounded='medium' position='center' stretch  />
                  <Button color='primary' outline hover='false' text='Boys' onclick={()=>[setState('Boys'),setOpen(false)]} size='lg' rounded='medium' position='center' stretch  />
                </motion.div>
              </AnimatePresence>
            }
          </div>
          {state === 'Cars' ?
            <>
            <div className='flex items-center gap-2'>
              <Button color='primary' text='Filter Options' size='sm' rounded='medium' position='center' />
              <Button color='primary' icon_right={<NavArrowRight/>} outline text='Date' size='xs' rounded='medium' position='center' />
              <Button color='primary' icon_right={<NavArrowRight/>} outline text='Car Model' size='xs' rounded='medium' position='center' />
              <Button color='primary' icon_right={<NavArrowRight/>} outline text='Dealer' size='xs' rounded='medium' position='center' />
              <Button color='primary' icon_right={<NavArrowRight/>} outline text='Status' size='xs' rounded='medium' position='center' />
            </div>
            <div className='flex flex-col gap-2 h-[50vh] overflow-y-scroll'>
            <List 
              column1 ='Name'
              column2 ='Number'
              column3 ='Price'
              column4 ='Car Model'
              column5 ='Dealer'
              column6 ='Status'
              status={true}
              data={[0,1,2,3,4,5,6,7,8,9,10]}
              />
          </div>
            </>
          :<>
            <div className='flex flex-col gap-1'>
              <Text text='Search for Driver' fontSize='caption'/>
              <Input color='primary' outside_icon={false} stretch InputFunction={(e)=>(console.log(e.target.value))}/>
            </div>
            <div className='w-full flex flex-wrap gap-4 py-1 px-1'>
              {cardData.map((item)=>(
                <Card 
                  outline='primary' 
                  avatar 
                  avatar_image={item.avatar_image} 
                  avatar_primary_text={item.avatar_primary_text} 
                  avatar_secondary_text={item.avatar_secondary_text}
                  
                  />
              ))}
              {cardData.map((item)=>(
                <Card 
                  outline='primary' 
                  avatar 
                  avatar_image={item.avatar_image} 
                  avatar_primary_text={item.avatar_primary_text} 
                  avatar_secondary_text={item.avatar_secondary_text}
                  
                  />
              ))}
            </div>
          </>
          }
        </div>

      </div>
  )
}
