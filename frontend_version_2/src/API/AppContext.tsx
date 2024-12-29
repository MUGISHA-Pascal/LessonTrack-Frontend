import { createContext } from "react";

interface AppContextType {
  jwt: string;
  setJwt: (jwt: string) => void;
}
export const AppContext = createContext<AppContextType | null>(null);
