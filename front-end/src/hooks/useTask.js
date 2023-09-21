import { useContext } from "react";
import { TaskContext } from "../contexts/task";

const useTask = () => {
  const context = useContext(TaskContext);

  return context;
};

export default useTask;
