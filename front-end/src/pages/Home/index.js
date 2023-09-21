import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import useTask from "../../hooks/useTask";
import * as C from "./styles";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");

  const { createTask, listTask, deleteTask } = useTask();

  const handlerListTask = async () => {
    const res = await listTask();
    if (res.data) setTaskList(res.data);
    return;
  };

  useEffect(() => {
    (async () => {
      const res = await listTask();
      if (res.data) setTaskList(res.data);
    })();
  }, [listTask]);

  const handleTaskCreation = async () => {
    if (!task) {
      setError("campo em branco");
      return;
    }
    const res = await createTask(task);
    await handlerListTask();
    if (res) {
      setError(res);
      return;
    }
  };

  const handleTaskDeletion = async (taskId) => {
    await deleteTask(taskId);
    await handlerListTask();
  };

  return (
    <C.Container>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
      <Button Text="Lista de filmes" onClick={() => [navigate("/movie-list")]}>
        Lista de filmes
      </Button>
      <C.Content>
        <C.Title>Lista de tarefas</C.Title>
        <Input
          type="email"
          placeholder="Tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <C.labelError>{error}</C.labelError>
        {taskList.map((el) => {
          return (
            <C.Content>
              <C.Title>{el.description}</C.Title>
              <Button
                Text="Deletar tarefa"
                onClick={async () => await handleTaskDeletion(el.id)}
              />
            </C.Content>
          );
        })}
        <Button Text="Criar" onClick={async () => await handleTaskCreation()} />
      </C.Content>
    </C.Container>
  );
};

export default Home;
