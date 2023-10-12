import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

import Welcome from "../components/welcome";
import Login from "../components/login";
// import NewUser from "../components/newUser";
import CompanyInfo from "../components/companyInfo";
import ForgotPassword from "../components/forgotPassword";
import Billing from "../components/billing";
import ResetPassword from "../components/resetPassword";
import CreateProject from "../components/createProject";
import DocManager from "../components/docManager";
import MyProject from "../components/myProject";
import ProjectDirectory from "../components/projectDirectory";

import MyProjects from "../pages/MyProjects";
import Dashboard from "../pages/Dashboard";
import DocumentManager from "../pages/DocumentManager";
import Settings from "../pages/Settings";
import UserCreation from "../pages/UserCreation";
import DailyLogs from "../pages/DailyLogs";
// import Chatbot from "../pages/chatbot/chatbot";
import PicUpload from "../pages/DailyLogs/dropZone";
import autoMeasure from "../pages/AutoMeasure/autoMeasure";
import LoginPage from "../pages/Login/Login";
import RegistrationPage from "../pages/SignUp/SignUp";
import ContractorRegistrationPage from "../pages/SignUpContractor/SignUpContractor"
import RenovateAI from "../pages/RenovateAI";
import MySubProjects from "../pages/MySubProjects";
import AllProjects from "../pages/AllProjects";
import ProjectDetail from "../pages/ProjectDetail";
import SmartScheduler from "../pages/smartSchedule";
import MyBids from "../pages/MyBids";
import Approvals from "../pages/Approvals/Approvals";


export const routes = (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/signup" component={RegistrationPage} />
    <PublicRoute exact path="/signupcontractor" component={ContractorRegistrationPage} />
    <PublicRoute exact path="/companyinfo" component={CompanyInfo} />
    <PublicRoute exact path="/forgotpassword" component={ForgotPassword} />
    <PublicRoute exact path="/billing" component={Billing} />
    <PublicRoute exact path="/resetpassword" component={ResetPassword} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/projectDirectory" component={ProjectDirectory} />
    <PrivateRoute exact path="/renovateai" component={RenovateAI} />

    <PrivateRoute exact path="/myprojects" component={MyProjects} />
    {/* <PrivateRoute exact path="/mysubprojects" component={MySubProjects} /> */}
    <PrivateRoute exact path="/automeasure" component={autoMeasure} />
    <PrivateRoute exact path="/createProject" component={CreateProject} />
    <PrivateRoute exact path="/myProject/:id" component={MyProject} />
    <PrivateRoute exact path="/docManager" component={DocumentManager} />
    <PrivateRoute exact path="/settings" component={Settings} />
    <PrivateRoute exact path="/userCreation" component={UserCreation} />
    <PrivateRoute exact path="/dailylogs" component={DailyLogs} />
    <PrivateRoute exact path="/smartscheduler" component={SmartScheduler} />
    {/* <PrivateRoute exact path="/estimatorai" component={Chatbot} /> */}
    <PrivateRoute exact path="/pic" component={PicUpload} />
    <PrivateRoute exact path="/mysubprojects" component={MySubProjects} />
    <PrivateRoute exact path="/allprojects" component={AllProjects} />
    <PrivateRoute exact path="/projectDetail" component={ProjectDetail} />
    <PrivateRoute exact path="/mybids" component={MyBids} />
    <PrivateRoute exact path="/approvals" component={Approvals} />




    {/* <PrivateRoute exact path="/docManager" component={DocManager} /> */}
  </Switch>
);

// const AppRoute = () => {

//   return (
//     <>
//       <Router>
//         <Switch>
//           <Route exact path="/">
//             <Welcome />
//           </Route>
//           <Route path="/login" component={() => <Login />}></Route>
//           <Route path="/signup" component={() => <NewUser />}></Route>
//           <Route path="/companyinfo" component={() => <CompanyInfo />}></Route>
//           <Route path="/billing" component={() => <Billing />}></Route>
//           <Route
//             path="/forgotpassword"
//             component={() => <ForgotPassword />}
//           ></Route>
//           <Route
//             path="/resetpassword"
//             component={() => <ResetPassword />}
//           ></Route>
//           <Route
//             path="/dashboard"
//             exact
//             component={() => <Dashboard />}
//           ></Route>
//           <Route
//             path="/projectDirectory"
//             component={() => (
//               <ProjectDirectory
//               />
//             )}
//           ></Route>
//           <Route
//             path="/createProject"
//             component={() => (
//               <CreateProject
//               />
//             )}
//           ></Route>
//           <Route path="/myProject/:id" component={() => <MyProject />}></Route>
//           <Route path="/docManager" component={() => <DocManager />}></Route>
//           <Route path="/:pagename" component={Nan}></Route>
//         </Switch>
//       </Router>
//     </>
//   );
// };

// function Nan() {
//   const para = useParams();
//   return (
//     <h1
//       style={{
//         textAlign: "center",
//         width: "50%",
//         height: "65.9vh",
//         padding: "80px 30px",
//         margin: "20px auto",
//         backgroundColor: "rgb(229 229 229)",
//         borderRadius: "10px",
//       }}
//     >
//       <strong> "{para.pagename}"</strong> <br />
//       <strong> 404 </strong> <br />
//       <br />
//       This Page is Not Found
//     </h1>
//   );
// }
// export default AppRoute;
