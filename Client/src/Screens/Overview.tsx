import { Button, Card, Input, Text } from '../Exports/Exports'
import { cardData} from '../Exports/Constatants'
import { NavArrowDown, NavArrowRight } from 'iconoir-react'
import { List, ListHeader } from '../Components/List'
import { useApi } from '../Providers/ApiProvider'
import { useEffect, useState } from 'react'

export default function OverviewScreen(){

      const [transactions,setTransactions] = useState<Car[] | []>([])
      const [loading , setLoading] = useState(false)
  
      const { getTransaction } = useApi()
  
      useEffect(()=>{
        getTransaction({setLoading, setTransactions})
      },[])

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
          <div className='flex flex-col gap-2 h-[50vh] w-fit overflow-y-scroll'>
                              <ListHeader 
                                column1 ='Model'
                                column2 ='Chases No'
                                column3 ='Color'
                                column4 ='Date Out'
                                column5 ='Dealer'
                                column6 ='Status'
                                status={'WithDrawn'}
                                />
                                {
                                  loading? 'loading...'
                                  :
                                  transactions.map((item,index)=>(
                                    <List 
                                      key={index}
                                      color={item.vehicle_color_hex_code}
                                      column1 ={item.vehicle_type}
                                      column2 ={item.date_in}
                                      column3 ={item.chases_no}
                                      column4 ={item.vehicle_color}
                                      column5 ={item.date_out}
                                      column6 ={item.dealer}
                                      status={item.status}
                                      />
                                  ))
                                }
                            </div>
        </div>

      </div>
  )
}
