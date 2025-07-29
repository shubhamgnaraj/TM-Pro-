import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decode = jwtDecode(token);
      setUser(decode);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/employees/login");
  };

  return (
    <AuthContext.Provider value={{ user, logOut, isEdit, setIsEdit }}>
      {children}
    </AuthContext.Provider>
  );
}
