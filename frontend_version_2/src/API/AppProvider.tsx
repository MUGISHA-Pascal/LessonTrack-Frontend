import { ReactNode, useState } from "react";

import React from "react";
import { AppContext } from "./AppContext";
interface AppProviderProps {
  children: ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string>("");

  return (
    <AppContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
