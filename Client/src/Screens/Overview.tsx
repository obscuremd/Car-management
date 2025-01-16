import { Button, Card, Input, Text } from '../Exports/Exports'
import { cardData} from '../Exports/Constatants'
import { NavArrowDown, NavArrowRight } from 'iconoir-react'
import { List } from '../Components/List'

export default function OverviewScreen(){

  return (
    <div className='flex flex-col gap-8 w-full'>
        
        <div className='flex flex-col gap-1'>
          <Text text='Search for Driver' fontSize='caption'/>
          <Input color='primary' outside_icon={false} stretch InputFunction={(e)=>(console.log(e.target.value))}/>
        </div>

        <div className='flex flex-col gap-1'>
          <Text text='Select Park' fontSize='caption'/>
          <Button rounded='full' color='primary' size='xs' text='Hero Park' icon_right={<NavArrowDown/>}/>
        </div>
        
        <div className='w-full flex gap-4 overflow-x-scroll py-1 px-1'>
          {cardData.map((item)=>(
            <Card 
              outline='primary' 
              avatar 
              avatar_image={item.avatar_image} 
              avatar_primary_text={item.avatar_primary_text} 
              avatar_secondary_text={item.avatar_secondary_text}
              button
              button_text={`${item.button_text} boys`}/>
          ))}
        </div>
        
        <div className='flex flex-col gap-4'>
          <Button color='primary' hover='false' text='Transaction History' size='lg' rounded='medium' position='center' stretch  />
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
        </div>

      </div>
  )
}
