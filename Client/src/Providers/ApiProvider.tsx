import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import axios from "axios";
import { useGen } from "./GeneralProvider";

interface LoginParams {
  _id: string;
  password: string;
}

interface DealerProps {
  setDealer: React.Dispatch<React.SetStateAction<User[] | []>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RegisterCarProps {
  dealer: string;
  vehicle_type: string;
  chases_no: string;
  vehicle_color: string;
  vehicle_color_hex_code: string;
  date_in: string;
  date_out: string;
  status: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface BoyProps {
  setBoy: React.Dispatch<React.SetStateAction<Boy[] | []>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface TransactionProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface filterParams {
  value: string;
  filterBy: keyof Car;
}

interface apiProps {
  user: User | null;
  transactions: Car[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (params: LoginParams) => Promise<void>;
  registerCar: (params: RegisterCarProps) => Promise<void>;
  createUser: (params: User) => Promise<void>;
  checkAuth: () => Promise<void>;
  getDealer: (params: DealerProps) => Promise<void>;
  getBoy: (params: BoyProps) => Promise<void>;
  getTransaction: (params: TransactionProps) => Promise<void>;
  registerBoy: (params: Boy) => Promise<void>;
  filterByTransactions: (params: filterParams) => void;
  ResetFilter: () => void;
}

axios.defaults.withCredentials = true;

const ApiContext = createContext<apiProps | undefined>(undefined);

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const { user, setUser } = useGen();
  const url = "https://car-management-6t8v.vercel.app";

  const [transactions, setTransactions] = useState<Car[]>([]);
  const [originalTransactions, setOriginalTransactions] = useState<Car[]>([]);

  const login = async ({ _id, password }: LoginParams) => {
    try {
      const res = await axios.post(
        `${url}/user/login`,
        { _id, password },
        { withCredentials: true }
      );
      console.log("Login response:", res);
      console.log("Response Headers:", res.headers);
      setUser(res.data.user); // Update user state on successful login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const createUser = async ({
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
  }: User) => {
    if (
      !profile_picture ||
      !role ||
      !name ||
      !address ||
      !email ||
      !phone_number ||
      !sex ||
      !NIN ||
      !branch
    ) {
      return alert("all fields must be filled");
    }
    try {
      const res = await axios.post(`${url}/user/register`, {
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
      alert("User Created");
      window.location.reload();
    } catch (error) {
      console.error("Create user error:", error);
      alert("error registering user");
      throw error;
    }
  };
  const registerBoy = async ({
    profile_picture,
    name,
    dealer,
    address,
    email,
    phone_number,
    sex,
    NIN,
    branch,
  }: Boy) => {
    if (
      !profile_picture ||
      !dealer ||
      !name ||
      !address ||
      !email ||
      !phone_number ||
      !sex ||
      !NIN ||
      !branch
    ) {
      return alert("all fields must be filled");
    }
    try {
      const res = await axios.post(`${url}/boy/create`, {
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
      alert("Boy Created");
      window.location.reload();
    } catch (error) {
      console.error("Create user error:", error);
      alert("error registering user");
      throw error;
    }
  };
  const registerCar = async ({
    dealer,
    vehicle_type,
    chases_no,
    vehicle_color,
    vehicle_color_hex_code,
    date_in,
    date_out,
    status,
    setLoading,
  }: RegisterCarProps) => {
    setLoading(true);
    if (
      !dealer ||
      !vehicle_type ||
      !chases_no ||
      !vehicle_color ||
      !vehicle_color_hex_code ||
      !date_in ||
      !date_out ||
      !status
    ) {
      setLoading(false);
      return alert("all fields must be filled");
    }
    try {
      const res = await axios.post(`${url}/car/create`, {
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
      setTransactions((transaction) => [res.data.data, ...transaction]);
      setLoading(false);
      alert("transaction registered");
    } catch (error) {
      console.error("Create error:", error);
      setLoading(false);
      alert("registration failed");
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

  const getTransaction = async ({ setLoading }: TransactionProps) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/car/`);
      // sort by updated at
      const sortedData = res.data.sort(
        (a: Car, b: Car) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setTransactions(sortedData);
      setOriginalTransactions(sortedData);
      console.log("car response", res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      alert("error fetching dealers");
    }
  };
  const getDealer = async ({ setDealer, setLoading }: DealerProps) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/user/`);
      setDealer(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      alert("error fetching dealers");
    }
  };
  const getBoy = async ({ setBoy, setLoading }: BoyProps) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/boy/`);
      setBoy(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      alert("error fetching dealers");
    }
  };

  const filterByTransactions = ({
    value,
    filterBy,
  }: {
    value: string;
    filterBy: keyof Car;
  }) => {
    const data = transactions.filter((car) =>
      car[filterBy].toLowerCase().includes(value.toLowerCase())
    );
    setTransactions(data);
  };
  const ResetFilter = () => {
    setTransactions(originalTransactions);
  };

  return (
    <ApiContext.Provider
      value={{
        user,
        setUser,
        login,
        createUser,
        checkAuth,
        registerCar,
        getDealer,
        registerBoy,
        getBoy,
        getTransaction,
        transactions,
        filterByTransactions,
        ResetFilter,
      }}
    >
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
