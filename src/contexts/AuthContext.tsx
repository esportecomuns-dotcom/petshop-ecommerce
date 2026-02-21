import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const savedUser = localStorage.getItem("petshop-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if user exists in local storage "users" DB (mock)
    const users = JSON.parse(localStorage.getItem("petshop-all-users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === pass);
    
    if (found) {
      const userData = { id: found.id, name: found.name, email: found.email, avatar: found.name[0] };
      setUser(userData);
      localStorage.setItem("petshop-user", JSON.stringify(userData));
    } else {
      setIsLoading(false);
      throw new Error("Email ou senha inválidos.");
    }
    setIsLoading(false);
  };

  const register = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem("petshop-all-users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      setIsLoading(false);
      throw new Error("Este e-mail já está sendo usado.");
    }
    
    const newUser = { id: Math.random().toString(36).substr(2, 9), name, email, password: pass };
    users.push(newUser);
    localStorage.setItem("petshop-all-users", JSON.stringify(users));
    
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.name[0] };
    setUser(userData);
    localStorage.setItem("petshop-user", JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("petshop-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
