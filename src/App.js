import React from "react";
import { DataProvider } from "./components/DataContext";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRoute from "./util/AuthRoute";

import themeFile from "./style/Theme";
const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FirebaseIdToken;
if (token) {
  // decode the token
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1001 < Date.now()) {
    console.log(window.location.href);
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends React.Component {
  render() {
    return (
      <DataProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} authenticated={authenticated} />
            <Route exact path="/signup" component={Signup} authenticated={authenticated} />
          </Router>
        </ThemeProvider>
      </DataProvider>
    );
  }
}

export default App;
