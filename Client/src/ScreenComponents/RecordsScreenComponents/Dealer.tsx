import {  useState } from "react"
import { useApi } from "../../Providers/ApiProvider"
import { Button, ImageUpload, Input } from "../../Exports/Exports"
import {  NavArrowDown, User } from "iconoir-react"

export const Dealer =()=>{

  const { createUser, branchOptions } = useApi()


  const [profile_picture, setProfilePicture] = useState('');
  const password =''
  const login_id =''
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
              <Button color='primary' rounded='medium' stretch outline gap='justify-between' icon_left={<User/>} icon_right={<NavArrowDown/>} size='sm' text={`Gender:${sex}`}  onclick={()=>setDropdown(!dropdown)}/>
              {dropdown &&
                <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg z-50 bg-primary-900'>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Male'  onclick={()=>[setDropdown(false),setSex('Male')]}/>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Female'  onclick={()=>[setDropdown(false),setSex('Female')]}/>
                <Button color='primary' rounded='medium' stretch outline gap='justify-between'  size='sm' text='Other'  onclick={()=>[setDropdown(false),setSex('Other')]}/>
              </div>}
            </div>
            <div className='relative'>
              <Button color='primary' rounded='medium' stretch outline gap='justify-between' icon_left={<User/>} icon_right={<NavArrowDown/>} size='sm' text={`Branch:${branch}`}  onclick={()=>setDropdown1(!dropdown1)}/>
              {dropdown1 &&
                <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg bg-primary-900'>
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
      </div>
      <Button color='primary' size='lg' text='Register' stretch rounded='medium' onclick={()=>createUser({profile_picture, password, role, name, address, email, phone_number, sex,login_id, NIN, branch})}/>
    </div>
  )
}