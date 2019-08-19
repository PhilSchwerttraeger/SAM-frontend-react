import React from "react";
import { DataProvider } from "./components/DataContext";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  status: {
    danger: "orange"
  }
});

class App extends React.Component {
  render() {
    return (
      <DataProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Router>
        </ThemeProvider>
      </DataProvider>
    );
  }
}

export default App;
