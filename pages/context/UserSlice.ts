import { createContext } from "react";

export interface User {
  user: boolean;
  id: number;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<User>({
  user: false,
  id: -1,
  setUser: () => {},
});
