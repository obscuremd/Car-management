import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react"
import Auth from "./Navigation/Auth"
import Navigation from "./Navigation/Navigation"
import toast, { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useApi } from "./Providers/ApiProvider"
import axios from "axios"



function App() {

  const { user } = useClerk()
  const { url,setUser } = useApi()

  useEffect(()=>{

    const fetchUser =async()=>{
      const res = await axios.get(`${url}/user/${user?.username}`)
      if(res.data.success){
        setUser(res.data.data)
        console.log('username',user?.username)
        console.log('user:',res)
      }else{
        toast.error('error getting user')
      }
    }

    if(user){
      fetchUser()
    }

  },[user])

  return (
    <div className="relative bg-background-500 p-4 text-grayscale-500  min-h-screen max-w-screen">
      <Toaster/>
      <SignedIn>
        <Navigation/> 
      </SignedIn>
      <SignedOut>
        <Auth/> 
      </SignedOut>
    </div>
  )
}

export default App
