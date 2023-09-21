import { useContext } from "react";
import { MovieContext } from "../contexts/movie";

const useMovie = () => {
  const context = useContext(MovieContext);

  return context;
};

export default useMovie;
