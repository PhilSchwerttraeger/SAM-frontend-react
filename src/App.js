import React from "react";
import { DataProvider } from "./components/DataContext";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
// eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRoute from "./util/AuthRoute";

import themeFile from "./style/Theme";
const theme = createMuiTheme(themeFile);


class App extends React.Component {
  render() {
    let authenticated;
    const token = localStorage.FirebaseIdToken;
    if (token) {
      // decode the token
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        //window.location.href = "/login";
        authenticated = false;
      } else {
        authenticated = true;
      }
    }

    return (
      <DataProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthRoute
              exact
              path="/"
              componentAuthorized={Dashboard}
              componentUnauthorized={Login}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path="/login"
              componentAuthorized={Dashboard}
              componentUnauthorized={Login}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path="/signup"
              componentAuthorized={Dashboard}
              componentUnauthorized={Signup}
              authenticated={authenticated}
            />
          </Router>
        </ThemeProvider>
      </DataProvider>
    );
  }
}

export default App;
