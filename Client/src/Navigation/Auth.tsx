import { useState } from "react";
import { Button, Input, Text } from "../Exports/Exports";
import axios from "axios";
import { useGen } from "../Providers/GeneralProvider";

import { bouncy } from 'ldrs'
import { Lock, User } from "iconoir-react";
import { useApi } from "../Providers/ApiProvider";

bouncy.register()

export default function Auth(){

    const [_id, setId] = useState('')
    const{setUser} =useGen()
    const {url}=useApi()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const login = async () => {
        setLoading(true)
        try {
            const res = await axios.post( `${url}/user/login`, { _id, password });
            alert('logged in successfully')
            console.log("Login response:", res);
            console.log("Response Headers:", res.headers);
            setLoading(false)
            setUser(res.data.user); // Update user state on successful login
            window.location.reload()
        } catch (error) {
            alert('error')
            await setLoading(false)
            console.error("Login error:", error);
        }
    };

    return(
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="flex flex-col gap-16 h-fit w-[500px]">
                <Text text="Company" fontSize="t2" fontWeight="bold"/>

                <div className="flex flex-col gap-2">
                    <Input inside_icon={<User/>} outside_icon={false} placeholder="Login_id" value={_id} stretch InputFunction={(e)=>setId(e.target.value)}/>
                    <Input inside_icon={<Lock/>} outside_icon={false} placeholder="Login_password" value={password} stretch InputFunction={(e)=>setPassword(e.target.value)}/>
                </div>
                
                <Button color="primary" rounded="medium" icon_left={loading && <l-bouncy size="45" speed="1.75" color="white" />} size="md" text={loading?"":"Login"} stretch onclick={()=>login()}/>
                

            </div>
        </div>
    )
}