import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import useMovie from "../../hooks/useMovie";
import useTask from "../../hooks/useTask";
import * as C from "./styles";

const MovieList = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [pages, setPages] = useState(0);
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState("");

  const { listMovie } = useMovie();

  const handlerListMovie = async () => {
    setError("");
    const res = await listMovie(query);
    if (res.response.result.results.length) {
      setMovieList(res.response.result.results);
      return;
    }
    setError("Nenhum resultado encontrado");
  };

  return (
    <C.Container>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
      <Button Text="Lista de tarefas" onClick={() => [navigate("/home")]}>
        Lista de filmes
      </Button>
      <C.Content>
        <C.Title>Lista de filmes</C.Title>
        <Input
          type="email"
          placeholder="Tarefa"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <C.labelError>{error}</C.labelError>
        <Button
          Text="Procurar"
          onClick={async () => await handlerListMovie()}
        />
        {movieList.map((el) => {
          return <C.labelListMovie>Nome: {el.original_title}</C.labelListMovie>;
        })}
      </C.Content>
    </C.Container>
  );
};

export default MovieList;
