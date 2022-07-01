import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Routes/route";
import { React } from "react";

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
