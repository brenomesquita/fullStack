import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import env from "react-dotenv";
import GlobalStyle from "./styles/global";
import { TaskProvider } from "./contexts/task";
import { MovieProvider } from "./contexts/movie";

const App = () => (
  <AuthProvider>
    <TaskProvider>
      <MovieProvider>
        <RoutesApp />
        <GlobalStyle />
      </MovieProvider>
    </TaskProvider>
  </AuthProvider>
);

export default App;
