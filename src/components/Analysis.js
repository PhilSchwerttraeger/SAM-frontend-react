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
          //console.log(state.getDataTableRef());
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
              <p>{console.log(state.getSelectedEntries())}</p>
            </div>
          )
        }}
      </Consumer>
    )
  }
}