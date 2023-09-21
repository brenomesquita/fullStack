import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext({});

export const MovieProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    setUser(userToken);
  }, []);

  const listMovie = async (query) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user}` },
        params: {
          query,
        },
      };
      const { data } = await axios.get(
        `${window.env.API_URL}search/list`,
        config
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <MovieContext.Provider value={{ user, signed: !!user, listMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
