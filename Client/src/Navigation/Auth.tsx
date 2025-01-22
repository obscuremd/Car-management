import { useState } from "react";
import { Button, Input, Text } from "../Exports/Exports";
import { login } from "../Utils/Api";

export default function Auth(){

    const [_id, setId] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="flex flex-col gap-16 h-fit w-[500px]">
                <Text text="Company" fontSize="t2" fontWeight="bold"/>

                <div className="flex flex-col gap-2">
                    <Input placeholder="Login_id" stretch InputFunction={()=>setId}/>
                    <Input placeholder="Login_password" stretch InputFunction={()=>setPassword}/>
                </div>
                
                <Button color="primary" size="md" text="Login" stretch onclick={()=>login({_id,password})}/>
            </div>
        </div>
    )
}