import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import * as auth from "../api/auth.api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: auth.LoginData) => Promise<any>;
  signup: (data: auth.SignupData) => Promise<any>;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
  try {
    const user = await auth.profile();

    setUser(user);
  } catch (err) {
    console.log(err);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  const login = async (data: auth.LoginData) => {
    const res = await auth.login(data);

    try {
      await getProfile();
    } catch {}

    return res;
  };

  const signup = async (data: auth.SignupData) => {
    const res = await auth.signup(data);

    try {
      await getProfile();
    } catch {}

    return res;
  };

  const logout = async () => {
    await auth.logout();
    setUser(null);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};