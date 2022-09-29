import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.getItem("userId") && localStorage.getItem("userId") ? (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: routeProps.location },
            }}
          />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default PublicRoute;
