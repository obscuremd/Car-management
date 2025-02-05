import { useState } from "react";
import { Button, Input, Text } from "../Exports/Exports";

import { bouncy } from 'ldrs'
import { Lock, User } from "iconoir-react";
import toast from "react-hot-toast";
import { useSignIn } from "@clerk/clerk-react";

bouncy.register()

export default function Auth(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { isLoaded, signIn} = useSignIn()
    
  const login =async()=>{
    
    if(!isLoaded){return}
    
    if(username =='' || password === ''){
      setLoading(true)
      setTimeout(()=>{
        toast.error('Please enter your email/ password')
        setLoading(false)  
      },1000)
    }
    else{
      
      setLoading(true)

      try {
        await signIn.create({
          identifier: username,
          password: password
        })


      
      setTimeout(()=>{
        toast.success('Logged in successfully')
        setLoading(false)
        window.location.reload()
        },2000)
        
        
      } catch (err:unknown) {
        
        const error = err as { errors?: { code: string }[] };
        
        setLoading(false)
        if(error.errors && error.errors[0]?.code === 'form_param_format_invalid'){
          toast.error('Login-Id/Login-Password is invalid')
        }else{
          toast.error(JSON.stringify(error.errors && error.errors[0]?.code))
          console.log(JSON.stringify(error));
          console.log(error)
        }
      }
    }
  }

    return(
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="flex flex-col gap-16 h-fit w-[500px]">
                <Text text="Company" fontSize="t2" fontWeight="bold"/>

                <div className="flex flex-col gap-2">
                    <Input inside_icon={<User/>} outside_icon={false} placeholder="Login_id" value={username} stretch InputFunction={(e)=>setUsername(e.target.value)}/>
                    <Input inside_icon={<Lock/>} outside_icon={false} placeholder="Login_password" value={password} stretch InputFunction={(e)=>setPassword(e.target.value)}/>
                </div>
                
                <Button color="primary" rounded="medium" icon_left={loading && <l-bouncy size="45" speed="1.75" color="white" />} size="md" text={loading?"":"Login"} stretch onclick={()=>login()}/>
                

            </div>
        </div>
    )
}