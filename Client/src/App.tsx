import { useEffect, useState } from "react"
import Auth from "./Navigation/Auth"
import Navigation from "./Navigation/Navigation"
import { useGen } from "./Providers/GeneralProvider"
import { useApi } from "./Providers/ApiProvider"
import axios from "axios"


function App() {

  const { url }= useApi()
  
  const { setUser } = useGen()
  const [auth, setAuth] = useState(false)

  useEffect(()=>{
      const checkAuth = async () => {
        try {
          const res = await axios.get(`${url}/user/check-auth`);
          console.log(res)
          setAuth(res.data.success)
          setUser(res.data.user); // Update user state with authenticated user data
        } catch (error) {
          console.error("Check auth error:", error);
          throw error;
        }
      };
      checkAuth()
  },[])

  return (
    <div className="relative bg-background-500 p-4 text-grayscale-500  min-h-screen max-w-screen">
      { auth?<Navigation/> :<Auth/> }
      <Navigation/>
    </div>
  )
}

export default App
