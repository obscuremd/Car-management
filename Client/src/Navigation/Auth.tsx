import { useState } from "react";
import { Button, Input, Text } from "../Exports/Exports";
import { useApi } from "../Providers/ApiProvider";

export default function Auth(){

    const [_id, setId] = useState('')
    const { login }= useApi()
    const [password, setPassword] = useState('')

    return(
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="flex flex-col gap-16 h-fit w-[500px]">
                <Text text="Company" fontSize="t2" fontWeight="bold"/>

                <div className="flex flex-col gap-2">
                    <Input placeholder="Login_id" stretch InputFunction={(e)=>setId(e.target.value)}/>
                    <Input placeholder="Login_password" stretch InputFunction={(e)=>setPassword(e.target.value)}/>
                </div>
                
                <Button color="primary" size="md" text="Login" stretch onclick={()=>login({_id,password})}/>
            </div>
        </div>
    )
}