import "./App.css";
import { Router as BrowserRouter, Route } from "react-router-dom";
import { routes } from "./Routes/route";
import { React } from "react";
import { createBrowserHistory } from "history";
import { LanguageProvider } from "./containers/language";

const newHistory = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={newHistory}>
      <LanguageProvider>
      <Route>{routes}</Route>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
