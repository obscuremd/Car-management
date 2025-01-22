import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface generalProps {
    user : User | null,
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}

const GeneralContext = createContext<generalProps | undefined>(undefined)

export const GeneralProvider=({children}:PropsWithChildren)=>{

    const [user,setUser] = useState<User |null>(null)

    return(
        <GeneralContext.Provider value={{user,setUser}}>
            {children}
        </GeneralContext.Provider>
    )
}

export const useGen = (): generalProps => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralProvider");
  }
  return context;
};