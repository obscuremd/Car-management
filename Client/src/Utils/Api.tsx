import axios from "axios"

export const url = 'https://car-management-6t8v.vercel.app'


interface LoginParams {
  _id: string;
  password: string;
}
export async function login ({_id,password}:LoginParams){
    try {
        const res = await axios.post(`${url}/user/login`,{_id,password})
        console.log(res)
        return res.data
    } catch (error) {
        return error
    }
}
export async function createUser (){
    const res = axios.post(`${url}/user/register`)
    console.log(res)
}

interface checkAuth {
  setUser : React.Dispatch<React.SetStateAction<User | null>>
}

export async function checkAuth ({setUser}:checkAuth){
    try {
        const res = await axios.get(`${url}/user/check-auth`)
        setUser(res.data.data)
    } catch (error) {
        return error        
    }
}