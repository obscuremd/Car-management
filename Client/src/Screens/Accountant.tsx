import { NavArrowRight, User } from "iconoir-react";
import { List } from "../Components/List";
import { Button, Card, ImageUpload, Input, Text } from "../Exports/Exports";
import { cardData } from "../Exports/Constatants";
import { useState } from "react";

interface Props {
  image:string;
  setImage:React.Dispatch<React.SetStateAction<string>>
}


export default function Accountant(){

    const [add,setAdd] = useState(false)
    const [image,setImage] = useState('')


    return(
        <div className='flex flex-col gap-8 w-full'>
                
                <div className='flex flex-col gap-1'>
                  <Text text='What would you like to add to the records' fontSize='caption'/>
                  <div className='flex gap-1'>
                    <Button rounded='full'  onclick={()=>setAdd(!add)} color='primary' size='xs' text='Add Accountant'/>
                  </div>
                </div>
                
                {add && <Boys image={image} setImage={setImage}/>}

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
                            button_text={`Hero Park`}/>
                        ))}
                    </div>
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
                    button_text='Hero Park'
                    />
                
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