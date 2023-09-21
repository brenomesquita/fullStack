import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    setUser(userToken);
  }, []);

  const signin = async (username, password) => {
    try {
      const { data } = await axios.get(`${window.env.API_URL}users/login`, {
        params: {
          username: username,
          password: password,
        },
      });
      localStorage.setItem("user_token", data.data.token);

      setUser({ username, password });
      return;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const signup = async (username, password) => {
    try {
      await axios.post(`${window.env.API_URL}users/signup`, {
        username: username,
        password: password,
      });
    } catch (error) {
      return error.response.data.message;
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
