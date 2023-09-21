import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    setUser(userToken);
  }, []);

  const createTask = async (description) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user}` },
      };
      await axios.post(
        `${window.env.API_URL}tasks/create`,
        {
          description: description,
          dueDate: "2023-09-20",
        },
        config
      );
      return;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const listTask = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user}` },
      };
      const { data } = await axios.get(
        `${window.env.API_URL}tasks/list`,
        config
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user}` },
        data: {
          id: taskId,
        },
      };
      const { data } = await axios.delete(
        `${window.env.API_URL}tasks/delete`,
        config
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <TaskContext.Provider
      value={{ user, signed: !!user, listTask, createTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
