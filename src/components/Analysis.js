import React, { Component } from 'react';
import { Consumer } from './DataContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AnalysisFragment from './AnalysisFragment';
//import TextField from '@material-ui/core/TextField';

export default class Analysis extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  
  stylePaper = () => {
    return {
      padding: 16
    }
  }

  render() {
    return (
      <Consumer>
        {state => {
          //console.log(state.getSelectedEntries());
          let selectedEntries = state.getSelectedEntries();
          let visibleRowsIDs = [];
          let visibleRowsValues = [];
          if(selectedEntries){
            selectedEntries.forEach(element => {
              if(
                element.data === undefined
                || element.data.id === undefined
                || element.data.value === undefined
              ) return;
              visibleRowsIDs.push(element.data.id);
              visibleRowsValues.push(element.data.value);
            }); 
          }
          console.log(visibleRowsIDs);
          console.log(visibleRowsValues);
          return (
            <div>
              <h2>{state.data.strings.titles.analysis}</h2>
              {/*
              <p>
                IDs: {
                  visibleRowsIDs.map(
                    item => {return item + " "}
                  )
                }
              </p>
              <p>
                Values: {
                  visibleRowsValues.map(
                    item => {return item + " "}
                  )
                }
              </p>
              */}
              
              <Grid container spacing={3}>
                <Grid item>
                  <Paper style={this.stylePaper()}>
                    <AnalysisFragment 
                      type="sum"
                      values={visibleRowsValues}
                    />
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper style={this.stylePaper()}>
                    <AnalysisFragment 
                      type="average"
                      values={visibleRowsValues}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )
        }}
      </Consumer>
    )
  }
}