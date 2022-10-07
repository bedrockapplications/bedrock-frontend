import "./App.css";
import { Router as BrowserRouter, Route } from "react-router-dom";
import { routes } from "./Routes/route";
import { React, Suspense } from "react";
import { createBrowserHistory } from "history";

const newHistory = createBrowserHistory();

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter history={newHistory}>
        <Route>{routes}</Route>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
