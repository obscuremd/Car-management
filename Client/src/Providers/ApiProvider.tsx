import React, { createContext, PropsWithChildren, useContext } from "react";
import axios from "axios";
import { useGen } from "./GeneralProvider";


interface LoginParams {
  _id: string;
  password: string;
}

interface apiProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (params: LoginParams) => Promise<void>;
  createUser: () => Promise<void>;
  checkAuth: () => Promise<void>;
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

    const createUser = async () => {
        try {
        const res = await axios.post(`${url}/user/register`);
        console.log("Create user response:", res);
        } catch (error) {
        console.error("Create user error:", error);
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

    return (
        <ApiContext.Provider value={{ user, setUser, login, createUser, checkAuth }}>
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
