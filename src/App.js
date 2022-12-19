import "./App.css";
import { Router as BrowserRouter, Route } from "react-router-dom";
import { routes } from "./Routes/route";
import { React, Suspense } from "react";
import { createBrowserHistory } from "history";
import Snackbar from "./components/Snackbar";
import Loading from "./components/Loading";

const newHistory = createBrowserHistory();

function App() {
  return (
    <Suspense fallback={null}>
      <Loading />
      <Snackbar />
      <BrowserRouter history={newHistory}>
        <Route>{routes}</Route>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
