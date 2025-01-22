import { useEffect } from "react"
import Auth from "./Navigation/Auth"
import Navigation from "./Navigation/Navigation"
import { checkAuth } from "./Utils/Api"
import { useGen } from "./Providers/GeneralProvider"


function App() {

  const { user, setUser} = useGen()

  useEffect(()=>{
    checkAuth({setUser})
  },[])

  return (
    <div className="relative bg-background-500 p-4 text-grayscale-500  min-h-screen">
      { user?<Navigation/> :<Auth/> }
    </div>
  )
}

export default App
