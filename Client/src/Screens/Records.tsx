import { Button, Card, ImageUpload, Input, Text } from '../Exports/Exports'
import { cardData } from '../Exports/Constatants'
import { Check, NavArrowRight, User } from 'iconoir-react'
import { List} from '../Components/List'
import { useState } from 'react'

interface Props {
  image:string | null;
  setImage:React.Dispatch<React.SetStateAction<string |null>>
}

export default function RecordsScreen(){

  const [state,setState] = useState(4)
  const [image,setImage] = useState<string | null>(null)

  return (
    <div className='flex flex-col gap-8 w-full'>
        
        <div className='flex flex-col gap-1'>
          <Text text='What would you like to add to the records' fontSize='caption'/>
          <div className='flex gap-1'>
            <Button rounded='full' outline={state!==0} onclick={()=>setState(0)} color={'primary'} size='xs' text='Add Transaction'/>
            <Button rounded='full' outline={state!==1} onclick={()=>setState(1)} color='primary' size='xs' text='Add Dealer'/>
            <Button rounded='full' outline={state!==2} onclick={()=>setState(2)} color='primary' size='xs' text='Add Boy'/>
          </div>
        </div>
        
        {state === 0 && <Transactions image={image} setImage={setImage}/>}
        {state === 1 && <Dealer image={image} setImage={setImage}/>}
        {state === 2 && <Boys image={image} setImage={setImage}/>}
        
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

const Boys =({image,setImage}:Props)=>{
  return(
    <div>
      <div>
        <Text text='Designated Dealer' fontSize='t2' fontWeight='semibold'/>
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
      </div>
      <div className='flex gap-8 md:flex-row flex-col'>
        <ImageUpload imageUrl={image} setImageUrl={setImage} stretch/>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Full Name' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='D.O.B' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='Phone Number' inside_icon={<User/>} outside_icon={false}/>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Gender' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='N.I.N.' inside_icon={<User/>} outside_icon={false}/>
          </div>
      </div>
    </div>
  )
}
const Transactions =({image,setImage}:Props)=>{
  return(
    <div>
      <div className='flex gap-8 md:flex-row flex-col'>
        <ImageUpload imageUrl={image} setImageUrl={setImage} stretch/>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Dealer' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='Car Model' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='Price' inside_icon={<User/>} outside_icon={false}/>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Order Date' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='Sold Date' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='Price' inside_icon={<User/>} outside_icon={false}/>
          </div>
          <div className='h-fit flex flex-col gap-6 p-4 rounded-2xl border-[1px]'>
            <Text text='Status' fontSize='body' fontWeight='semibold'/>
            <div className='flex gap-6'>

              <div className='flex items-center gap-2'>
                <Button color='text' outline size='sm_icon' rounded='full' icon_left={<Check/>}/>
                <Text text='Sold' fontSize='body' fontWeight='semibold'/>
              </div>
              <div className='flex items-center gap-2'>
                <Button color='text' outline size='sm_icon' rounded='full' icon_left={<Check/>}/>
                <Text text='Unsold' fontSize='body' fontWeight='semibold'/>
              </div>
            
            </div>
          </div>
      </div>
    </div>
  )
}
const Dealer =({image,setImage}:Props)=>{
  return(
    <div>
      <div className='flex gap-8 md:flex-row flex-col'>
        <ImageUpload imageUrl={image} setImageUrl={setImage} stretch/>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Full Name' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='D.O.B' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='Phone Number' inside_icon={<User/>} outside_icon={false}/>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Gender' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='N.I.N.' inside_icon={<User/>} outside_icon={false}/>
            <Input stretch placeholder='Select Branch' inside_icon={<User/>} outside_icon={false}/>
          </div>
      </div>
    </div>
  )
}
