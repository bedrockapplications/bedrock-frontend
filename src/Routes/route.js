import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

import Welcome from "../components/welcome";
import Login from "../components/login";
import NewUser from "../components/newUser";
import CompanyInfo from "../components/companyInfo";
import ForgotPassword from "../components/forgotPassword";
import Billing from "../components/billing";
import ResetPassword from "../components/resetPassword";
import CreateProject from "../components/createProject";
import DocManager from "../components/docManager";
import MyProject from "../components/myProject";
import ProjectDirectory from "../components/projectDirectory";

import LoginPage from "../pages/Login/Login";
import MyProjects from "../pages/MyProjects";
import Dashboard from "../pages/Dashboard";
import DocumentManager from "../pages/DocumentManager";
import Settings from "../pages/Settings";
import UserCreation from "../pages/UserCreation";
// import DailyLogs from "../pages/DailyLogs";
import Chatbot from "../pages/chatbot/chatbot";
import PicUpload from "../pages/DailyLogs/dropZone";
import autoMeasure from "../pages/AutoMeasure/autoMeasure";

export const routes = (
  <Switch>
    <PublicRoute exact path="/" component={Welcome} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/signup" component={NewUser} />
    <PublicRoute exact path="/companyinfo" component={CompanyInfo} />
    <PublicRoute exact path="/forgotpassword" component={ForgotPassword} />
    <PublicRoute exact path="/billing" component={Billing} />
    <PublicRoute exact path="/resetpassword" component={ResetPassword} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/projectDirectory" component={ProjectDirectory} />

    <PrivateRoute exact path="/myprojects" component={MyProjects} />
    <PrivateRoute exact path="/automeasure" component={autoMeasure} />
    <PrivateRoute exact path="/createProject" component={CreateProject} />
    <PrivateRoute exact path="/myProject/:id" component={MyProject} />
    <PrivateRoute exact path="/docManager" component={DocumentManager} />
    <PrivateRoute exact path="/settings" component={Settings} />
    <PrivateRoute exact path="/userCreation" component={UserCreation} />
    {/* <PrivateRoute exact path="/dailylogs" component={DailyLogs} /> */}
    <PrivateRoute exact path="/estimatorai" component={Chatbot} />
    <PrivateRoute exact path="/pic" component={PicUpload} />

    {/* <PrivateRoute exact path="/docManager" component={DocManager} /> */}
  </Switch>
);
