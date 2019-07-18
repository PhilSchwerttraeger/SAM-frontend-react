import React, { Component } from 'react';
import { Consumer } from './DataContext';
import Button from '@material-ui/core/Button';
//import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

export default class Analysis extends Component {
  constructor(props){
    super(props);
    this.state = {};
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
          //console.log(visibleIDs);
          return (
            <div>
              <h4 style={{fontWeight: 500}}>{state.data.strings.titles.analysis}</h4>
              <Button 
              variant="outlined" 
              onClick={
                () => {
                  state.getDataTableRef().getCurrentlyVisibleRows()
                }
              }>Button
              </Button>
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
            </div>
          )
        }}
      </Consumer>
    )
  }
}