import { useEffect, useState } from "react"
import { useApi } from "../../Providers/ApiProvider"
import colorsData from "../../assets/colors.json"
import { Button, Input, Text } from "../../Exports/Exports"
import { Check, NavArrowDown, User } from "iconoir-react"


export const Transactions =()=>{

    const {getDealer, registerCar, branchOptions} = useApi()
    const[loading, setLoading] = useState(false)

    const [uploadLoading , setUploadLoading] = useState(false)

    useEffect(()=>{
      getDealer({setDealer:setDealerArray, setLoading})
    },[])

    const [dropdown, setDropdown] = useState(false)
    const [dropdown1, setDropdown1] = useState(false)
    const [dealerDropdown, setDealerDropdown] = useState(false)
    const [colors, setColors] = useState(colorsData)
    const[dealerArray, setDealerArray] =useState<User[]>([])
    const [dealersFilter,setDealersFilter] = useState(dealerArray)

    const [ dealer,setDealer] = useState('')
    const [ vehicle_type,setVehicleType] = useState('')
    const [ chases_no,setChasesNo] = useState('')
    const [ vehicle_color,setVehicleColor] = useState('')
    const [ vehicle_color_hex_code,setVehicleColorHex] = useState('fff')
    const [ date_in,setDateIn] = useState('')
    const [ date_out,setDateOut] = useState('')
    const [ status, setStatus] = useState('')
    const [branch, setBranch] = useState('');


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

  const DealerInputFunction =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const value = e.target.value
    setDealer(value)
    setDealerDropdown(true)
    if(value.trim() === ""){
        setDealersFilter(dealerArray)
    }else{
        const filterDealer = dealersFilter.filter((dealer)=>dealer.name.toLowerCase().includes(value.toLowerCase()))
        setDealersFilter(filterDealer)
    }
  } 

  return(
    <div className='flex flex-col gap-2'>
      <div className='flex gap-8 md:flex-row flex-col'>
          <div className='w-full flex flex-col gap-2'>
            <div className='relative'>
              <Input value={dealer} stretch placeholder='select a dealer' InputFunction={(e)=>DealerInputFunction(e)} outside_icon={false}/>
              {dealerDropdown && <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg h-48 overflow-y-scroll'>
                { loading
                ? 'Loading'
                :
                    dealersFilter.map((item,index)=>(
                      <Button 
                        key={index} 
                        gap='justify-between'
                        color='primary' 
                        onclick={()=>[setDealer(item.name),setDealerDropdown(false)]}
                        outline 
                        size='sm' 
                        stretch 
                        text={item.name} 
                        rounded='medium'/>
                    ))
                }
              </div>}
            </div>
            <Input value={vehicle_type} stretch placeholder='Car Model' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setVehicleType(e.target.value)}/>
            <Input value={chases_no} stretch placeholder='Chases No' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setChasesNo(e.target.value)}/>

          </div>
          <div className='w-full flex flex-col gap-2'>
            <Input value={date_in} type='date' stretch placeholder='Order Date' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setDateIn(e.target.value)}/>
            <Input value={date_out} type='date' stretch placeholder='Sold Date' inside_icon={<User/>} outside_icon={false} InputFunction={(e)=>setDateOut(e.target.value)}/>
            <div className='relative'>
              <Button color='primary' rounded='medium' stretch outline gap='justify-between' icon_left={<User/>} icon_right={<NavArrowDown/>} size='sm' text={`Branch:${branch}`}  onclick={()=>setDropdown1(true)}/>
              {dropdown1 &&
                <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg '>
                {branchOptions.map((item, index) => (
                  <Button
                    key={index}
                    gap="justify-between"
                    color="primary"
                    onclick={() =>[setBranch(item), setDropdown1(false)]}
                    stretch
                    outline
                    size="sm"
                    text={item}
                    rounded="medium"
                  />
                ))}
              </div>}
            </div>
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
      <Button color='primary' size='lg' text={uploadLoading? 'Loading ...':'Register'} stretch rounded='medium' onclick={()=>registerCar({dealer, vehicle_type, chases_no, vehicle_color, vehicle_color_hex_code, date_in, date_out, status, branch, setLoading:setUploadLoading})}/>
    </div>
  )
}