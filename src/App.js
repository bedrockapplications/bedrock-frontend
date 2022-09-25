import "./App.css";
import { Router as BrowserRouter, Route } from "react-router-dom";
import { routes } from "./Routes/route";
import { React } from "react";
import { createBrowserHistory } from "history";

const newHistory = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={newHistory}>
      <Route>{routes}</Route>
    </BrowserRouter>
  );
}

export default App;
