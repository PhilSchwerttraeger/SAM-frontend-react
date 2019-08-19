import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Analysis from "../components/Analysis/Analysis";
import DataTable from "../components/DataTable/DataTable";
import NavBar from "../components/NavBar";

export default class Dashboard extends Component {
  styleMain = () => {
    return {
      flexGrow: 1,
      padding: 16,
      backgroundColor: "#F8F8F8"
    };
  };

  stylePaper = () => {
    return {
      padding: 16
    };
  };

  render() {
    return (
      <div>
        <NavBar />
        <Grid container spacing={3} className="main">
          <Grid item xs={12}>
            <Analysis />
          </Grid>
          <Grid item xs={12}>
            <Paper style={this.stylePaper()}>
              <DataTable />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
