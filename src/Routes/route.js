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

import MyProjects from "../pages/MyProjects";
import Dashboard from "../pages/Dashboard";

export const routes = (
  <Switch>
    <PublicRoute exact path="/" component={Welcome} />
    <PublicRoute exact path="/login" component={Login} />
    <PublicRoute exact path="/signup" component={NewUser} />
    <PublicRoute exact path="/companyinfo" component={CompanyInfo} />
    <PublicRoute exact path="/forgotpassword" component={ForgotPassword} />
    <PublicRoute exact path="/billing" component={Billing} />
    <PublicRoute exact path="/resetpassword" component={ResetPassword} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/projectDirectory" component={ProjectDirectory} />
    
    <PrivateRoute exact path="/myprojects" component={MyProjects} />
    <PrivateRoute exact path="/createProject" component={CreateProject} />
    <PrivateRoute exact path="/myProject/:id" component={MyProject} />
    <PrivateRoute exact path="/docManager" component={DocManager} />
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
