import React, { Component } from 'react';
import { Consumer } from '../DataContext';
import Grid from '@material-ui/core/Grid';
import AnalysisFragment from './AnalysisFragment';
//import TextField from '@material-ui/core/TextField';

export default class Analysis extends Component {
  getAndValidateValues = (state) => {
    
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
    let xs = 12, sm = 6, md = 6, lg = 3, xl = 3;

    return (
      <Consumer>
        {state => {
          let analysisSections = state.data.generalConfig.analysisSections;
          if(!analysisSections) analysisSections = [""];
          let validatedValues = this.getAndValidateValues(state);
          
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
                  justify="flex-start"
                >
                  {analysisSections.map(type => {
                    return (
                      <Grid key={type} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                          <AnalysisFragment 
                            type={type}
                            visibleRows={validatedValues}
                          />
                      </Grid>
                    )
                  })}
                </Grid>
            </div>
          )
        }}
      </Consumer>
    )
  }
}