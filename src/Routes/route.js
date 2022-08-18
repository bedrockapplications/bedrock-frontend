import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
import Billing from "../components/billing";
import CompanyInfo from "../components/companyInfo";
import CreateProject from "../components/createProject";
import Dashboard from "../components/dashboard";
import DocManager from "../components/docManager";
import ForgotPassword from "../components/forgotPassword";
import Login from "../components/login";
import MyProject from "../components/myProject";
import NewUser from "../components/newUser";
import ProjectDirectory from "../components/projectDirectory";
import ResetPassword from "../components/resetPassword";
import Welcome from "../components/welcome";

const AppRoute = () => {
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/login" component={() => <Login />}></Route>
          <Route path="/signup" component={() => <NewUser />}></Route>
          <Route path="/companyinfo" component={() => <CompanyInfo />}></Route>
          <Route path="/billing" component={() => <Billing />}></Route>
          <Route
            path="/forgotpassword"
            component={() => <ForgotPassword />}
          ></Route>
          <Route
            path="/resetpassword"
            component={() => <ResetPassword />}
          ></Route>
          <Route
            path="/dashboard"
            exact
            component={() => <Dashboard />}
          ></Route>
          <Route
            path="/projectDirectory"
            component={() => (
              <ProjectDirectory
              />
            )}
          ></Route>
          <Route
            path="/createProject"
            component={() => (
              <CreateProject
              />
            )}
          ></Route>
          <Route path="/myProject/:id" component={() => <MyProject />}></Route>
          <Route path="/docManager" component={() => <DocManager />}></Route>
          <Route path="/:pagename" component={Nan}></Route>
        </Switch>
      </Router>
    </>
  );
};

function Nan() {
  const para = useParams();
  return (
    <h1
      style={{
        textAlign: "center",
        width: "50%",
        height: "65.9vh",
        padding: "80px 30px",
        margin: "20px auto",
        backgroundColor: "rgb(229 229 229)",
        borderRadius: "10px",
      }}
    >
      <strong> "{para.pagename}"</strong> <br />
      <strong> 404 </strong> <br />
      <br />
      This Page is Not Found
    </h1>
  );
}
export default AppRoute;
