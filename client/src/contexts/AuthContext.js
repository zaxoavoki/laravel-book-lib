import jwt from "jsonwebtoken";
import React, { createContext, useEffect, useState } from "react";

const initValue = {
  user: undefined,
  token: undefined,
};

export const AuthContext = createContext(initValue);

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(initValue);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token.replace("Bearer ", ""));
    }
  }, []);

  function setToken(token) {
    if (token) {
      setAuth({
        user: jwt.decode(token),
        token: "Bearer " + token,
      });
      localStorage.setItem("token", "Bearer " + token);
    } else {
      setAuth(initValue);
      localStorage.removeItem("token");
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setToken, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
