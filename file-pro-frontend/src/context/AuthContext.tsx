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
  getProfile: (isInitialLoad?: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const extractUserData = (res: any): User | null => {
    if (!res) return null;
    const candidate = res?.data?.user || res?.user || res?.data || res;
    if (candidate && typeof candidate === "object" && "id" in candidate) {
      return candidate as User;
    }
    return null;
  };

  const getProfile = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }
      const res = await auth.profile();
      const userData = extractUserData(res);
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  };

  const login = async (data: auth.LoginData) => {
    const res = await auth.login(data);
    const userData = extractUserData(res);

    if (userData) {
      setUser(userData);
    } else {
      await getProfile(false);
    }

    return res;
  };

  const signup = async (data: auth.SignupData) => {
    const res = await auth.signup(data);
    const userData = extractUserData(res);

    if (userData) {
      setUser(userData);
    } else {
      await getProfile(false);
    }

    return res;
  };

  const logout = async () => {
    try {
      await auth.logout();
    } catch {
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    getProfile(true);
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
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};