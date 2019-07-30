import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import WaitingGame from "./components/WaitingGame";

ReactDOM.render(
  <Router>
    <WaitingGame />
  </Router>,
  document.getElementById("root")
);
