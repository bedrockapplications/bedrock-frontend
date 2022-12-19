import "./App.css";
import { Router as BrowserRouter, Route } from "react-router-dom";
import { routes } from "./Routes/route";
import { React, Suspense } from "react";
import { createBrowserHistory } from "history";
import Snackbar from "./components/Snackbar";

const newHistory = createBrowserHistory();

function App() {
  return (
    <Suspense fallback={null}>
      <Snackbar />
      <BrowserRouter history={newHistory}>
        <Route>{routes}</Route>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
