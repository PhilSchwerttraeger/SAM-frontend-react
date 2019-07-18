import React, { Component } from 'react';
import { Consumer } from './DataContext';
import Button from '@material-ui/core/Button';
//import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';

export default class Analysis extends Component {
  render() {
    return (
      <Consumer>
        {state => {
          
          // console.log(this.refs.agGrid);
          return (
            <div>
              <Button variant="outlined" onClick={() => {this.refs.agGrid.api.deselectAll()}}>Clear Selection</Button>
              <h4 style={{fontWeight: 500}}>{state.data.strings.titles.analysis}</h4>
            </div>
          )
        }}
      </Consumer>
    )
  }
}