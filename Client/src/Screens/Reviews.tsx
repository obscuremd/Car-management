import { Button, Card, Input, Text } from '../Exports/Exports'
import { cardData, timelineData } from '../Exports/Constatants'
import { NavArrowDown, NavArrowLeft, NavArrowRight, Star } from 'iconoir-react'

export default function ReviewsScreen(){

    return (
    <div className='flex flex-col md:flex-row gap-8 w-full'>
      {/* right part */}
      <div className='w-full md:w-[50%] flex flex-col gap-8'>
        
        <div className='flex flex-col gap-1'>
          <Text text='Leave a review  for a branch so they know how they’re performing' fontSize='caption'/>
        </div>
        
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
              <Text text='Select a Branch' fontSize='caption'/>
              <Button rounded='full' color='text' outline size='xs' text='Online' icon_right={<NavArrowDown/>}/>
          </div>
          <Input type='text area' stretch outside_icon={false} placeholder='Review'/>
          <div className='h-fit w-fit flex flex-col gap-2 p-4 rounded-2xl border-[1px]'>
              <Text text='Rating' fontSize='body' fontWeight='semibold'/>
              <div className='flex gap-2'>
                <Button color='text' outline size='sm_icon' rounded='full' icon_left={<Star/>}/>
                <Button color='text' outline size='sm_icon' rounded='full' icon_left={<Star/>}/>
                <Button color='text' outline size='sm_icon' rounded='full' icon_left={<Star/>}/>
                <Button color='text' outline size='sm_icon' rounded='full' icon_left={<Star/>}/>
                <Button color='text' outline size='sm_icon' rounded='full' icon_left={<Star/>}/>
              </div>
            </div>
        </div>
        

          
          
        
        <div className='flex flex-col gap-1'>
          <Text text='Top Performing Dealers' fontSize='t2' fontWeight='bold'/>
          <div className='w-full flex overflow-y-scroll md:flex-wrap gap-4 py-1 px-1'>
            {cardData.map((item)=>(
              <Card 
                image={item.image} 
                outline='primary' 
                avatar 
                avatar_image={item.avatar_image} 
                avatar_primary_text={item.avatar_primary_text} 
                avatar_secondary_text={item.avatar_secondary_text}
                button
                button_text='2023 Acura MDX'/>
            ))}
          </div>
        </div>
        
      </div>
      
      {/* left part */}
      <div className='w-full md:w-[50%] gap flex flex-col gap-8'>
        
        <div className='flex flex-col gap-4'>
          <Button color='primary' hover='false' text='Reviews' size='lg' rounded='medium' position='center' stretch  />
          <div className='flex items-center gap-2'>
            <Button color='primary' icon_left={<NavArrowLeft/>} outline text='Dec' size='xs' rounded='medium' position='center' />
            <Button color='primary' text='January' size='sm' rounded='medium' position='center' />
            <Button color='primary' icon_right={<NavArrowRight/>} outline text='Feb' size='xs' rounded='medium' position='center' />
          </div>
          <div className='flex flex-col gap-2 h-[70vh] overflow-y-scroll'>
            {timelineData.map((item)=>(
              <div className='flex gap-2 items-center'>
                <Text no_wrap text={item.time}/>
                <Card 
                  outline='white' 
                  avatar avatar_image='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' 
                  avatar_primary_text='bai hamar' 
                  avatar_secondary_text='Rating:  3.5 ⭐'
                  secondary_text={item.secondary_text} 
                  stretch 
                  border 
                  hover={false} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
