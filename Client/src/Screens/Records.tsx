import { Button, Card, ImageUpload, Input, Text } from '../Exports/Exports'
import { cardData } from '../Exports/Constatants'
import { Check, NavArrowDown, NavArrowRight, User } from 'iconoir-react'
import { List} from '../Components/List'
import { useState } from 'react'
import colorsData from "../assets/colors.json"
import {useApi } from '../Providers/ApiProvider'

interface Props {
  image:string
  setImage:React.Dispatch<React.SetStateAction<string>>
}

export default function RecordsScreen(){

  const [state,setState] = useState(4)
  const [image,setImage] = useState('')

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
        
        {state === 0 && <Transactions/>}
        {state === 1 && <Dealer/>}
        {state === 2 && <Boys image={image} setImage={setImage}/>}
        
        <div className='flex flex-col gap-4'>
          <Button color='primary' outline hover='false' text='Transaction History' size='lg' rounded='medium' position='center' stretch  />
          <div className='flex items-center gap-2'>
            <Button color='primary' text='Filter Options' size='sm' rounded='medium' position='center' />
            <Button color='primary' icon_right={<NavArrowRight/>} outline text='Date' size='xs' rounded='medium' position='center' />
            <Button color='primary' icon_right={<NavArrowRight/>} outline text='Car Model' size='xs' rounded='medium' position='center' />
            <Button color='primary' icon_right={<NavArrowRight/>} outline text='Dealer' size='xs' rounded='medium' position='center' />
            <Button color='primary' icon_right={<NavArrowRight/>} outline text='Status' size='xs' rounded='medium' position='center' />
          </div>
          <div className='flex flex-col gap-2 h-[50vh] overflow-y-scroll'>
            <List 
              column1 ='Dealer'
              column2 ='Chases Number'
              column4 ='Car Model'
              column3 ='Date Out'
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
const Transactions =()=>{

  const { registerCar } = useApi()

  const [dropdown, setDropdown] = useState(false)
  const [colors, setColors] = useState(colorsData)

  const [ dealer,setDealer] = useState('')
  const [ vehicle_type,setVehicleType] = useState('')
  const [ chases_no,setChasesNo] = useState('')
  const [ vehicle_color,setVehicleColor] = useState('')
  const [ vehicle_color_hex_code,setVehicleColorHex] = useState('fff')
  const [ date_in,setDateIn] = useState('')
  const [ date_out,setDateOut] = useState('')
  const [ status, setStatus] = useState('')

  const inputFunction =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const value = e.target.value
    setVehicleColor(value)
    setDropdown(true)

    const filterColor = colorsData.filter((color)=>color.name.toLowerCase().includes(value.toLowerCase()))
    setColors(filterColor)
  } 

  const onclick =({value, color}: { value: string; color: string })=>{
    setVehicleColor(value)
    setVehicleColorHex(color)
    setDropdown(false)
  }

  return(
    <div className='flex flex-col gap-2'>
      <div className='flex gap-8 md:flex-row flex-col'>
          <div className='w-full flex flex-col gap-2'>
            <Input value={dealer} stretch placeholder='Dealer' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setDealer(e.target.value)}/>
            <Input value={vehicle_type} stretch placeholder='Car Model' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setVehicleType(e.target.value)}/>
            <Input value={chases_no} placeholder='Chases No' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setChasesNo(e.target.value)}/>

          </div>
          <div className='w-full flex flex-col gap-2'>
            <Input value={date_in} type='date' stretch placeholder='Order Date' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setDateIn(e.target.value)}/>
            <Input value={date_out} type='date' stretch placeholder='Sold Date' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setDateOut(e.target.value)}/>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <div className='relative'>
              <Input value={vehicle_color} stretch placeholder='select a color' InputFunction={(e)=>inputFunction(e)} inside_icon={<div style={{backgroundColor:`#${vehicle_color_hex_code}`}} className={`w-[10px] h-[10px] rounded-full`}/>} outside_icon={false}/>
              {dropdown && <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg h-48 overflow-y-scroll'>
                {
                    colors.map((item,index)=>(
                      <Button 
                        key={index} 
                        gap='justify-between'
                        icon_left={<div style={{backgroundColor:`#${item.hex}`}} className={`w-[10px] h-[10px] rounded-full`}/>} 
                        color='primary' 
                        onclick={()=>onclick({value:item.name, color:item.hex})}
                        outline 
                        size='sm' 
                        stretch 
                        text={item.name} 
                        rounded='medium'/>
                    ))
                }
              </div>}
            </div>
            <div className='h-fit flex flex-col gap-6 p-4 rounded-2xl border-[1px]'>
              <Text text='Status' fontSize='body' fontWeight='semibold'/>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <Button  outline size='sm_icon' rounded='full' color={status ==='sold' ? 'primary':'text'} icon_left={status === 'sold' && <Check/>} onclick={()=>setStatus('sold')}/>
                  <Text text='Sold' fontSize='body' fontWeight='semibold'/>
                </div>
                <div className='flex items-center gap-2'>
                  <Button outline size='sm_icon' rounded='full' color={status ==='unsold' ? 'primary':'text'} icon_left={status === 'unsold' && <Check/>} onclick={()=>setStatus('unsold')} />
                  <Text text='Unsold' fontSize='body' fontWeight='semibold'/>
                </div>
                <div className='flex items-center gap-2'>
                  <Button outline size='sm_icon' rounded='full' color={status ==='withdrawn' ? 'primary':'text'} icon_left={status === 'withdrawn' && <Check/>} onclick={()=>setStatus('withdrawn')}/>
                  <Text text='Withdrawn' fontSize='body' fontWeight='semibold'/>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Button color='primary' size='lg' text='Register' stretch rounded='medium' onclick={()=>registerCar({dealer, vehicle_type, chases_no, vehicle_color, vehicle_color_hex_code, date_in, date_out, status})}/>
    </div>
  )
}
const Dealer =()=>{

  const [profile_picture, setProfilePicture] = useState('');
  const password =''
  const role = "dealer";
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [sex, setSex] = useState<"Male" | "Female" | "Other">('Female');
  const [NIN, setNIN] = useState('');
  const [branch, setBranch] = useState('');

  const [dropdown, setDropdown] = useState(false)
  const [dropdown1, setDropdown1] = useState(false)

  const { createUser } = useApi()

  return(
    <div className='flex flex-col gap-2'>
      <div className='flex gap-8 md:flex-row flex-col'>
        <ImageUpload imageUrl={profile_picture} setImageUrl={setProfilePicture} stretch/>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Full Name' inside_icon={<User/>} outside_icon={false} value={name} InputFunction={(e)=>setName(e.target.value)}/>
            <Input stretch placeholder='Email' inside_icon={<User/>} outside_icon={false} value={email} InputFunction={(e)=>setEmail(e.target.value)}/>
            <Input stretch placeholder='Phone Number' inside_icon={<User/>} outside_icon={false} value={phone_number} InputFunction={(e)=>setPhoneNumber(e.target.value)}/>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <Input stretch placeholder='Address' inside_icon={<User/>} outside_icon={false} value={address} InputFunction={(e)=>setAddress(e.target.value)}/>
            <Input stretch placeholder='N.I.N.' inside_icon={<User/>} outside_icon={false} value={NIN} InputFunction={(e)=>setNIN(e.target.value)}/>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <div className='relative'>
              <Button color='primary' rounded='medium' stretch outline gap='justify-between' icon_left={<User/>} icon_right={<NavArrowDown/>} size='sm' text={`Gender:${sex}`}  onclick={()=>setDropdown(true)}/>
              {dropdown &&
                <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg z-50'>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Male'  onclick={()=>[setDropdown(false),setSex('Male')]}/>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Female'  onclick={()=>[setDropdown(false),setSex('Female')]}/>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Other'  onclick={()=>[setDropdown(false),setSex('Other')]}/>
              </div>}
            </div>
            <div className='relative'>
              <Button color='primary' rounded='medium' stretch outline gap='justify-between' icon_left={<User/>} icon_right={<NavArrowDown/>} size='sm' text={`Branch:${branch}`}  onclick={()=>setDropdown1(true)}/>
              {dropdown1 &&
                <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg '>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Hero Park'  onclick={()=>[setDropdown1(false),setBranch('Hero Park')]}/>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Corolla 1'  onclick={()=>[setDropdown1(false),setBranch('Corolla 1')]}/>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Corolla 2'  onclick={()=>[setDropdown1(false),setBranch('Corolla 2')]}/>
              </div>}
            </div>
          </div>
      </div>
      <Button color='primary' size='lg' text='Register' stretch rounded='medium' onclick={()=>createUser({profile_picture, password, role, name, address, email, phone_number, sex, NIN, branch})}/>
    </div>
  )
}
