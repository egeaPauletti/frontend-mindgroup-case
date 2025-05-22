import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  user: UserProps | null;
  handleLogin: (user: any) => void;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
  imageProfile: string;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const handleLogin = (userData: any) => {
    // console.log("aqui");
    // console.log(userData);
    setUser(userData);
    // console.log("valor inicial", user);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
