import React, { createContext, PropsWithChildren, useContext } from "react";
import axios from "axios";
import { useGen } from "./GeneralProvider";


interface LoginParams {
  _id: string;
  password: string;
}

interface DealerProps {
  setDealer: React.Dispatch<React.SetStateAction<User[] | []>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
interface BoyProps {
  setBoy: React.Dispatch<React.SetStateAction<Boy[] | []>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
interface TransactionProps {
  setTransactions: React.Dispatch<React.SetStateAction<Car[] | []>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface apiProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (params: LoginParams) => Promise<void>;
  registerCar: (params: Car) => Promise<void>;
  createUser: (params: User) => Promise<void>;
  checkAuth: () => Promise<void>;
  getDealer: (params: DealerProps) => Promise<void>;
  getBoy: (params: BoyProps) => Promise<void>;
  getTransaction: (params: TransactionProps) => Promise<void>;
  registerBoy: (params: Boy) => Promise<void>;
}

  axios.defaults.withCredentials = true;

const ApiContext = createContext<apiProps | undefined>(undefined);

export const ApiProvider = ({ children }: PropsWithChildren) => {

    const {user, setUser} = useGen()
    const url = "https://car-management-6t8v.vercel.app";

    const login = async ({ _id, password }: LoginParams) => {
        try {
        const res = await axios.post(`${url}/user/login`, { _id, password },{withCredentials:true});
        console.log("Login response:", res);
        console.log("Response Headers:", res.headers);
        setUser(res.data.user); // Update user state on successful login
        } catch (error) {
        console.error("Login error:", error);
        }
    };
    
    const createUser = async ({profile_picture, password, role, name, address, email, phone_number, sex, NIN, branch,}:User) => {
      if(!profile_picture || !role || !name || !address || !email || !phone_number || !sex || !NIN || !branch){
        return alert('all fields must be filled')
      }
        try {
        const res = await axios.post(`${url}/user/register`,{
          profile_picture,
          password,
          role,
          name,
          address,
          email,
          phone_number,
          sex,
          NIN,
          branch,
        });
        console.log("Create user response:", res);
        alert('User Created')
        window.location.reload()
        } catch (error) {
        console.error("Create user error:", error);
        alert('error registering user')
        throw error;
        }
    };
    const registerBoy = async ({profile_picture,name, dealer, address, email, phone_number, sex, NIN, branch,}:Boy) => {
      if(!profile_picture || !dealer || !name || !address || !email || !phone_number || !sex || !NIN || !branch){
        return alert('all fields must be filled')
      }
        try {
        const res = await axios.post(`${url}/boy/create`,{
          profile_picture,
          dealer,
          name,
          address,
          email,
          phone_number,
          sex,
          NIN,
          branch,
        });
        console.log("Create user response:", res);
        alert('Boy Created')
        window.location.reload()
        } catch (error) {
        console.error("Create user error:", error);
        alert('error registering user')
        throw error;
        }
    };
    const registerCar = async ({dealer, vehicle_type, chases_no, vehicle_color, vehicle_color_hex_code, date_in, date_out, status}:Car) => {
      if(!dealer || !vehicle_type || !chases_no || !vehicle_color || !vehicle_color_hex_code || !date_in || !date_out || !status){
        return alert('all fields must be filled')
      }
        try {
        const res = await axios.post(`${url}/car/create`,{
          dealer,
          vehicle_type,
          chases_no,
          vehicle_color,
          vehicle_color_hex_code,
          date_in,
          date_out,
          status, 
        });
        console.log("Create response:", res);
        alert('transaction registered')
        } catch (error) {
        console.error("Create error:", error);
        alert('registration failed')
        throw error;
        }
    };

    const checkAuth = async () => {
        try {
        const res = await axios.get(`${url}/user/check-auth`);
        setUser(res.data.user); // Update user state with authenticated user data
        } catch (error) {
        console.error("Check auth error:", error);
        throw error;
        }
    };

    const getTransaction = async({setTransactions,setLoading}:TransactionProps)=>{
      setLoading(true)
      try {
        const res = await axios.get(`${url}/car/`)
        setTransactions(res.data)
        console.log('car response',res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(true)
        alert('error fetching dealers')
      }
    }
    const getDealer = async({setDealer,setLoading}:DealerProps)=>{
      setLoading(true)
      try {
        const res = await axios.get(`${url}/user/`)
        setDealer(res.data)
        console.log(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(true)
        alert('error fetching dealers')
      }
    }
    const getBoy = async({setBoy,setLoading}:BoyProps)=>{
      setLoading(true)
      try {
        const res = await axios.get(`${url}/boy/`)
        setBoy(res.data)
        console.log(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(true)
        alert('error fetching dealers')
      }
    }



    return (
        <ApiContext.Provider value={{ user, setUser, login, createUser, checkAuth, registerCar,getDealer, registerBoy, getBoy, getTransaction }}>
        {children}
        </ApiContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = (): apiProps => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
