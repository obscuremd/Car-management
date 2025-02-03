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
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
      const checkAuth = async () => {
        setLoading(true)
        try {
          const res = await axios.get(`${url}/user/check-auth`);
          console.log(res.data.data)
          setAuth(res.data.success)
          setUser(res.data.data); // Update user state with authenticated user data
          setLoading(false)
        } catch (error) {
          console.error("Check auth error:", error);
          throw error;
          setLoading(false)
        }
      };
      checkAuth()
  },[])

  return (
    <div className="relative bg-background-500 p-4 text-grayscale-500  min-h-screen max-w-screen">
      { loading ? 'Loading...' :
        auth?<Navigation/> :<Auth/> 
      }
    </div>
  )
}

export default App
