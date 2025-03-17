import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./Header.jsx";
import Board from "./Board.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Board />
  </StrictMode>
);
