import { useEffect } from "react"
// import Auth from "./Navigation/Auth"
import Navigation from "./Navigation/Navigation"
// import { useGen } from "./Providers/GeneralProvider"
import { useApi } from "./Providers/ApiProvider"
// import axios from "axios"


function App() {

  // axios.defaults.withCredentials = true;
      const { checkAuth }= useApi()
  
  // const { user } = useGen()

  useEffect(()=>{
    checkAuth()
  },[])

  return (
    <div className="relative bg-background-500 p-4 text-grayscale-500  min-h-screen">
      {/* { user?<Navigation/> :<Auth/> } */}
      <Navigation/>
    </div>
  )
}

export default App
