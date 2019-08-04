import React, { Component } from 'react';
import { Consumer } from './DataContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AnalysisFragment from './AnalysisFragment';
//import TextField from '@material-ui/core/TextField';

export default class Analysis extends Component {  
  stylePaper = () => {
    return {
      padding: 14
    }
  }

  getAndValidateValues = (state) => {
    //console.log(state.getSelectedEntries());
    let selectedEntries = state.getSelectedEntries();
    let ids = [];
    let values = [];
    if(selectedEntries){
      selectedEntries.forEach(element => {

        // If not undefined... 
        if(
          !(element.data === undefined)
          && !(element.data.id === undefined)
          && !(element.data.value === undefined)
        )
        // (Cast strings to number)
        {
          if(typeof(element.data.value) == "string"){
            let castedNumber = Number(element.data.value);
            if(isNaN(castedNumber)){
              return;
            }
            element.data.value = castedNumber;
          }

          // ... add to list
          //console.log(Number(element.data.value));
          ids.push(element.data.id);
          if(element.data.type === "In"){
            values.push(element.data.value);
          } else if (element.data.type === "Out"){
            values.push(-element.data.value);
          }
          
        }
      }); 
    }
    
    return {ids, values};
  }

  render() {
    return (
      <Consumer>
        {state => {
          let validatedValues = this.getAndValidateValues(state);
          //console.log(validatedValues);
          return (
            <div>
              {/*
              <h2>{state.data.strings.titles.analysis}</h2>              
              */}
                <Grid 
                  container 
                  spacing={3}
                  direction="row"
                  alignItems="flex-start"
                  justify="space-between"
                >
                  {/*state.generalConfig.analysisSections.map(section)} */}
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                      <AnalysisFragment 
                        type="sum"
                        visibleRows={validatedValues}
                      />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                      <AnalysisFragment 
                        type="average"
                        visibleRows={validatedValues}
                      />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                      <AnalysisFragment 
                        type="minimum"
                        visibleRows={validatedValues}
                      />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                      <AnalysisFragment 
                        type="maximum"
                        visibleRows={validatedValues}
                      />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          )
        }}
      </Consumer>
    )
  }
}