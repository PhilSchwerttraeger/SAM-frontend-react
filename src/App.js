import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Analysis from './components/Analysis';
import Statistics from './components/Statistics';
import DataTable from './components/DataTable';

// General styling (depending on Material UI theme)
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const state = {
  "strings": {
    "titles": {
      "analysis": "Analysis",
      "statistics": "Statistics",
      "datatable": "Data Table"
    }
  }
}    

export default function App() {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Analysis state={state}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Statistics state={state}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <DataTable state={state}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}