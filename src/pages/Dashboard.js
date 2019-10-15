import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Analysis from "../components/Analysis/Analysis";
import DataTable from "../components/DataTable/DataTable";
import NavBar from "../components/NavBar";
import Entry from "../components/Modals/Entry"

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Grid container spacing={3} className="main">
          <Grid item xs={12}>
            <Analysis />
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: "16" }}>
              <DataTable />
              <Entry />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
