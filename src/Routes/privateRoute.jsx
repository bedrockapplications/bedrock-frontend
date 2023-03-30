import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "../components/Layout";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (localStorage.getItem("userId")) {
          return (
            <Layout>
              <Component {...routeProps} />
            </Layout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: routeProps.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
