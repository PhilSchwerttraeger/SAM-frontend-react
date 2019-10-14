import React from "react";
// eslint-disable-next-line
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({
  componentAuthorized: ComponentAuthorized,
  componentUnauthorized: ComponentUnauthorized,
  authenticated, ...rest
}) => (
    <Route
      {...rest}
      render={props =>
        authenticated === true ?
          <ComponentAuthorized /> :
          <ComponentUnauthorized {...props} />
      }
    />
  );

export default AuthRoute;
