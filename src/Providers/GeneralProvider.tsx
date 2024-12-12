import { createContext, PropsWithChildren, useContext, useState } from "react";

interface GeneralContextTypes{
    navbar: boolean
    setNavbar: React.Dispatch<React.SetStateAction<boolean>>
}

const GeneralContext = createContext<GeneralContextTypes | undefined>(undefined)

export default function GeneralProvider({children}: PropsWithChildren){

    
    const [navbar, setNavbar] = useState(false)
    
    return(
        <GeneralContext.Provider value={{navbar, setNavbar}}>
            {children}
        </GeneralContext.Provider>
    )
}

export const useGen = () => {
    const context = useContext(GeneralContext);
    if (!context) {
      throw new Error('useGeneral must be used within an GeneralProvider');
    }
    return context;
  };